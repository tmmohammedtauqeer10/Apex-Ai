import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  DELIVERABLE_KINDS,
  EVIDENCE_KINDS,
  ITEM_KINDS,
  MAX_BODY,
  MAX_TITLE,
  SHARED_ACTIONS,
  isRecordId,
  makeId,
  saveLibraryItem,
  saveSharedRecord,
  type DeliverableKind,
  type EvidenceKind,
  type ItemKind,
  type SharedAction,
} from "../lib/workspace.js";

const workingItem = z.object({
  kind: z.enum(ITEM_KINDS),
  title: z.string().trim().min(1).max(MAX_TITLE),
  body: z.string().trim().min(1).max(MAX_BODY),
  evidence: z.enum(EVIDENCE_KINDS).optional(),
  citation: z.string().trim().min(1).max(500).optional(),
  deliverable: z.enum(DELIVERABLE_KINDS).optional(),
  id: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/)
    .optional(),
});

const sharedChange = z
  .object({
    kind: z.literal("shared_change"),
    action: z.enum(SHARED_ACTIONS),
    title: z.string().trim().min(1).max(MAX_TITLE),
    body: z.string().trim().min(1).max(MAX_BODY),
    targetId: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/)
      .optional(),
  })
  .refine((value) => value.action !== "update_shared" || value.targetId !== undefined, {
    message: "update_shared requires targetId",
    path: ["targetId"],
  });

const inputSchema = z.discriminatedUnion("kind", [workingItem, sharedChange]);

type SaveResult =
  | {
      saved: true;
      status: "saved";
      id: string;
      scope: "library";
      kind: ItemKind;
      replaced: boolean;
    }
  | {
      saved: false;
      status: "rejected";
      reason: string;
    }
  | {
      applied: true;
      status: "applied";
      id: string;
      scope: "shared";
      action: SharedAction;
      delivered: false;
      delivery: "stored_only";
      note: string;
    }
  | {
      applied: false;
      status: "rejected" | "eval" | "awaiting_approval";
      reason: string;
    };

const STORED_ONLY =
  "No outbound channel is connected. The approved text is stored as a shared record. It was not sent.";

export default defineTool({
  description: prompt`
    Save session working material, or apply a shared change after approval.

    Use kind note, source, or draft for the shared working library.
    A source must include evidence: measured, interview, note, or assumption.
    Measured evidence must include a citation. Pass id to replace a saved item.

    Use kind shared_change only after the user explicitly asks to send,
    publish, or update a shared record. The call waits for approval in the
    session. Until that approval is granted, nothing is stored or sent.
    Approval stores the text. It does not send email, Slack, or any other channel.
  `,
  inputSchema,
  effect: "write",
  needsApproval: (input) => input.kind === "shared_change",
  dryRunResult: (input) => {
    if (input.kind === "shared_change") {
      return { applied: false, status: "dry_run", action: input.action, title: input.title };
    }
    return { saved: false, status: "dry_run", kind: input.kind, title: input.title };
  },
  async execute(input, ctx): Promise<SaveResult> {
    if (input.kind === "shared_change") {
      if (ctx.session.purpose === "eval") {
        return { applied: false, status: "eval", reason: "Eval sessions do not change shared records." };
      }
      if (!Object.prototype.hasOwnProperty.call(ctx, "approvedBy")) {
        return {
          applied: false,
          status: "awaiting_approval",
          reason: "A shared change waits for approval in the session. Nothing was stored or sent.",
        };
      }
      const id = input.action === "update_shared" ? input.targetId : makeId(input.title, ctx.now());
      if (id === undefined || !isRecordId(id)) {
        return { applied: false, status: "rejected", reason: "update_shared requires targetId." };
      }
      const saved = await saveSharedRecord(ctx.host.kv, {
        id,
        action: input.action,
        title: input.title,
        body: input.body,
        targetId: input.targetId ?? null,
        appliedAt: ctx.now().toISOString(),
        delivered: false,
        delivery: "stored_only",
      });
      if (!saved.ok) {
        return { applied: false, status: "rejected", reason: saved.reason };
      }
      return {
        applied: true,
        status: "applied",
        id,
        scope: "shared",
        action: input.action,
        delivered: false,
        delivery: "stored_only",
        note: STORED_ONLY,
      };
    }

    const rejected = rejectWorkingItem(input);
    if (rejected !== undefined) {
      return rejected;
    }

    const id = input.id ?? makeId(input.title, ctx.now());
    const item = {
      id,
      kind: input.kind,
      title: input.title,
      body: input.body,
      evidence: input.evidence ?? null,
      citation: input.citation ?? null,
      deliverable: input.deliverable ?? null,
      updatedAt: ctx.now().toISOString(),
    };
    const saved = await saveLibraryItem(ctx.host.kv, item);
    if (!saved.ok) {
      return { saved: false, status: "rejected", reason: saved.reason };
    }
    return {
      saved: true,
      status: "saved",
      id,
      scope: "library",
      kind: input.kind,
      replaced: saved.replaced,
    };
  },
});

function rejectWorkingItem(input: {
  kind: ItemKind;
  evidence?: EvidenceKind;
  citation?: string;
  deliverable?: DeliverableKind;
}): SaveResult | undefined {
  if (input.kind === "source" && input.evidence === undefined) {
    return {
      saved: false,
      status: "rejected",
      reason: "A source needs evidence: measured, interview, note, or assumption.",
    };
  }
  if (input.evidence === "measured" && input.citation === undefined) {
    return {
      saved: false,
      status: "rejected",
      reason: "Measured evidence needs a citation.",
    };
  }
  return undefined;
}

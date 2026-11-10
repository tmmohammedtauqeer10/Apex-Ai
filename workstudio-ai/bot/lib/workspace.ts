import type { HostKvApi, JsonValue } from "@grok/agent-sdk";

export const MAX_BODY = 8000;
export const MAX_TITLE = 200;
export const MAX_ITEMS = 40;
export const MAX_RECALL = 20;

export const EVIDENCE_KINDS = ["measured", "interview", "note", "assumption"] as const;
export const ITEM_KINDS = ["note", "source", "draft"] as const;
export const DELIVERABLE_KINDS = ["idea", "plan", "presentation", "usage"] as const;
export const SHARED_ACTIONS = ["send", "publish", "update_shared"] as const;

export type EvidenceKind = (typeof EVIDENCE_KINDS)[number];
export type ItemKind = (typeof ITEM_KINDS)[number];
export type DeliverableKind = (typeof DELIVERABLE_KINDS)[number];
export type SharedAction = (typeof SHARED_ACTIONS)[number];

export type WorkspaceItem = {
  id: string;
  kind: ItemKind;
  title: string;
  body: string;
  evidence: EvidenceKind | null;
  citation: string | null;
  deliverable: DeliverableKind | null;
  updatedAt: string;
};

export type SharedRecord = {
  id: string;
  action: SharedAction;
  title: string;
  body: string;
  targetId: string | null;
  appliedAt: string;
  delivered: false;
  delivery: "stored_only";
};

type IndexEntry = {
  id: string;
  kind: string;
  title: string;
  updatedAt: string;
};

const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/;

export function isRecordId(value: string): boolean {
  return ID_PATTERN.test(value);
}

export function makeId(title: string, now: Date): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const stamp = now.toISOString().replace(/[:.]/g, "");
  return `${slug || "item"}-${stamp}`;
}

function indexKey(scope: string): string {
  return `ws:${scope}:index`;
}

function itemKey(scope: string, id: string): string {
  return `ws:${scope}:item:${id}`;
}

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && options.some((option) => option === value);
}

function readIndex(value: JsonValue | undefined): IndexEntry[] {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }
  const items = value.items;
  if (!Array.isArray(items)) {
    return [];
  }
  const entries: IndexEntry[] = [];
  for (const item of items) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      continue;
    }
    if (typeof item.id !== "string" || typeof item.title !== "string" || typeof item.updatedAt !== "string") {
      continue;
    }
    entries.push({
      id: item.id,
      kind: typeof item.kind === "string" ? item.kind : "unknown",
      title: item.title,
      updatedAt: item.updatedAt,
    });
  }
  return entries;
}

function parseItem(value: JsonValue | undefined): WorkspaceItem | undefined {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  if (typeof value.id !== "string" || typeof value.title !== "string" || typeof value.body !== "string") {
    return undefined;
  }
  if (!isOneOf(value.kind, ITEM_KINDS) || typeof value.updatedAt !== "string") {
    return undefined;
  }
  const evidence = value.evidence === null || isOneOf(value.evidence, EVIDENCE_KINDS) ? value.evidence : null;
  const deliverable =
    value.deliverable === null || isOneOf(value.deliverable, DELIVERABLE_KINDS) ? value.deliverable : null;
  return {
    id: value.id,
    kind: value.kind,
    title: value.title,
    body: value.body,
    evidence,
    citation: typeof value.citation === "string" ? value.citation : null,
    deliverable,
    updatedAt: value.updatedAt,
  };
}

function parseShared(value: JsonValue | undefined): SharedRecord | undefined {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  if (typeof value.id !== "string" || typeof value.title !== "string" || typeof value.body !== "string") {
    return undefined;
  }
  if (!isOneOf(value.action, SHARED_ACTIONS) || typeof value.appliedAt !== "string") {
    return undefined;
  }
  return {
    id: value.id,
    action: value.action,
    title: value.title,
    body: value.body,
    targetId: typeof value.targetId === "string" ? value.targetId : null,
    appliedAt: value.appliedAt,
    delivered: false,
    delivery: "stored_only",
  };
}

function planIndex(
  items: IndexEntry[],
  entry: IndexEntry,
): { ok: true; replaced: boolean; items: IndexEntry[] } | { ok: false; reason: string } {
  const replaced = items.some((item) => item.id === entry.id);
  if (!replaced && items.length >= MAX_ITEMS) {
    return {
      ok: false,
      reason: `This store already holds ${MAX_ITEMS} records. Reuse an id to replace one.`,
    };
  }
  const next = items.filter((item) => item.id !== entry.id);
  next.push(entry);
  return { ok: true, replaced, items: next };
}

export async function saveLibraryItem(
  kv: HostKvApi,
  item: WorkspaceItem,
): Promise<{ ok: true; replaced: boolean } | { ok: false; reason: string }> {
  const scope = "library";
  const planned = planIndex(readIndex(await kv.get(indexKey(scope))), {
    id: item.id,
    kind: item.kind,
    title: item.title,
    updatedAt: item.updatedAt,
  });
  if (!planned.ok) {
    return planned;
  }
  await kv.put(itemKey(scope, item.id), item);
  await kv.put(indexKey(scope), { items: planned.items });
  return { ok: true, replaced: planned.replaced };
}

export async function saveSharedRecord(
  kv: HostKvApi,
  record: SharedRecord,
): Promise<{ ok: true; replaced: boolean } | { ok: false; reason: string }> {
  const scope = "shared";
  if (record.action === "update_shared") {
    const existing = parseShared(await kv.get(itemKey(scope, record.id)));
    if (existing === undefined) {
      return { ok: false, reason: `No shared record with id ${record.id}.` };
    }
  }
  const planned = planIndex(readIndex(await kv.get(indexKey(scope))), {
    id: record.id,
    kind: record.action,
    title: record.title,
    updatedAt: record.appliedAt,
  });
  if (!planned.ok) {
    return planned;
  }
  await kv.put(itemKey(scope, record.id), record);
  await kv.put(indexKey(scope), { items: planned.items });
  return { ok: true, replaced: planned.replaced };
}

export async function listLibraryItems(
  kv: HostKvApi,
  limit: number,
  kind?: ItemKind,
): Promise<{ items: WorkspaceItem[]; unreadable: number }> {
  return listParsed(kv, "library", limit, parseItem, kind);
}

export async function listSharedRecords(
  kv: HostKvApi,
  limit: number,
): Promise<{ items: SharedRecord[]; unreadable: number }> {
  return listParsed(kv, "shared", limit, parseShared);
}

async function listParsed<T>(
  kv: HostKvApi,
  scope: string,
  limit: number,
  parse: (value: JsonValue | undefined) => T | undefined,
  kind?: string,
): Promise<{ items: T[]; unreadable: number }> {
  const entries = readIndex(await kv.get(indexKey(scope)))
    .filter((entry) => kind === undefined || entry.kind === kind)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  const items: T[] = [];
  let unreadable = 0;
  for (const entry of entries) {
    if (items.length >= limit) {
      break;
    }
    const parsed = parse(await kv.get(itemKey(scope, entry.id)));
    if (parsed === undefined) {
      unreadable += 1;
      continue;
    }
    items.push(parsed);
  }
  return { items, unreadable };
}

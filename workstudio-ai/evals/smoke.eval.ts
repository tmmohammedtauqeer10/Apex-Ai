import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "A measured source is saved, and nothing is published.",
  async test(t) {
    await t.send(
      'Call save_workspace_item once. kind: "source". title: "Checkout drop-off". body: "42% of weekly active users opened Checkout last week." evidence: "measured". citation: "analytics export 2026-03-01". Do not publish, send, or update a shared record.',
    );
    t.succeeded();
    t.calledTool("save_workspace_item", {
      input: {
        kind: "source",
        evidence: "measured",
        citation: "analytics export 2026-03-01",
      },
      count: 1,
    });
    t.maxToolCalls(1);
    t.noFailedActions();
  },
});

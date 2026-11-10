# WorkStudio AI

WorkStudio AI helps a person develop an idea, plan work, prepare a presentation, and explain how products are used.

The agent project is in `workstudio-ai/`.

## Assumptions

- The chat surface is the local playground and HTTP. No Slack, GitHub, or other connector is attached.
- Product usage comes from sources the person saves. There is no analytics connector.
- A request to send, publish, or change a shared record waits for approval. The approved text is stored. It is not sent to an external channel.

## Run locally

```bash
cd workstudio-ai
npx @grok/agent-sdk dev
```

Open the playground URL the command prints. Sign in with `npx @grok/agent-sdk login` before a model turn.

# WorkStudio AI + Halaqa

WorkStudio AI helps a person develop an idea, plan work, prepare a presentation, and explain how products are used.

The complete social product is **Halaqa**: private circles for useful,halal daily life.

## Products

- Agent: `workstudio-ai/`
- Halaqa MVP: `halaqa/`
- Deen Flow library: `deen-flow/`
- Final product bible: `workstudio-ai/bot/sandbox/workspace/product-final.md`

## Assumptions

- The owner's ideology is Sunni Islam, with Tasawwuf practiced according to Islam.
- Product advice prefers privacy,halal content, and useful daily-life benefit. The agent is not a mufti.
- The chat surface is the local playground and HTTP. No Slack, GitHub, or other connector is attached.
- Product usage comes from sources the person saves. There is no analytics connector.
- A request to send, publish, or change a shared record waits for approval. The approved text is stored. It is not sent to an external channel.

## Run Halaqa

```bash
cd halaqa
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`.

## Run Deen Flow

Darood Sharif, Ruhani Ilaj (ruqyah from the Qur'an and Sunnah), Duas, and Azkar. Each text stays in its own section, with the Islamic reference beside it.

From the repository root, so Halaqa and Deen Flow can link to each other:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/deen-flow/` and `http://127.0.0.1:4173/halaqa/`.

## Run WorkStudio AI

```bash
cd workstudio-ai
npx @grok/agent-sdk login
npx @grok/agent-sdk dev
```

Open the playground URL the command prints.

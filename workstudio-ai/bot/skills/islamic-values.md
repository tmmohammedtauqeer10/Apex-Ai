---
description: Use when the work must fit Sunni Islam and Tasawwuf, or when judging privacy,halal limits, or useful daily-life content for an Islamic product.
---

# Islamic values for WorkStudio

Owner frame: Sunni Islam, with Tasawwuf practiced according to Islam.

1. Call `recall_workspace` for ideology notes and product drafts. Also read `product-final.md` and `islamic-social-brief.md` in the workspace when the topic is Halaqa or in-app social.
2. State the aim in one sentence: sincerity, useful benefit (`manfaʿah`), privacy, and content that stays within Islamic limits. For any product UI or deck, require the ideology to appear openly (brand/header and an Ideology section). Never leave it only in a footer.
3. State the owner frame in plain words before feature lists: Sunni Islam, with Tasawwuf practiced according to Islam.
4. Separate three lists:
   - Allowed to build now (useful, private by default, clearly beneficial for daily life)
   - Needs a scholar before launch (ambiguous worship, finance, gender interaction, or commercial rulings)
   - Refuse or redesign (haram content, exploitation, deception, addictive nudges, privacy abuse)
5. For Islamic in-app social, prefer a closed circle over a viral public square. Default product choices:
   - Privacy: invite-only circles, private by default, least data collected, clear consent, delete-my-data, no sale of personal content
   - Halal content: no pornography, no intoxicant promotion, no interest-based lending pitch, no fortune-telling, no mockery of religion; report and review queue required
   - Useful daily life: prayer and calendar helpers, family-safe sharing, learning reminders, charity and community coordination, practical tips that do not replace a scholar
   - Tasawwuf tone: sincerity, humility, remembrance, and service. Avoid showy spirituality and claims of special secret knowledge
6. Mark every religious ruling as either a saved source, an owner instruction, or an assumption. Do not invent a fatwa.
7. When they ask you to keep this reading, call `save_workspace_item` with kind `draft` and deliverable `idea` or `plan`, whichever matches the request.

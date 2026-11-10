---
description: Use when the work must fit Sunni Islam and Tasawwuf, or when judging privacy, halal limits, or useful daily-life content for an Islamic product.
---

# Islamic values for WorkStudio

Owner frame: Sunni Islam, with Tasawwuf practiced according to Islam.

1. Call `recall_workspace` for ideology notes and product drafts.
2. State the aim in one sentence: sincerity, useful benefit (`manfaʿah`), privacy, and content that stays within Islamic limits.
3. Separate three lists:
   - Allowed to build now (useful, private by default, clearly beneficial for daily life)
   - Needs a scholar before launch (ambiguous worship, finance, gender interaction, or commercial rulings)
   - Refuse or redesign (haram content, exploitation, deception, addictive nudges, privacy abuse)
4. For an Islamic social or content product, default to:
   - Privacy: least data collected, clear consent, no sale of personal content, private by default for personal posts
   - Halal content: no pornography, no intoxicant promotion, no interest-based lending pitch, no fortune-telling, no mockery of religion
   - Useful daily life: prayer and calendar helpers, family-safe sharing, learning reminders, charity and community coordination, practical tips that do not replace a scholar
   - Tasawwuf tone: sincerity, humility, remembrance, and service. Avoid showy spirituality and claims of special secret knowledge
5. Mark every religious ruling as either a saved source, an owner instruction, or an assumption. Do not invent a fatwa.
6. When they ask you to keep this reading, call `save_workspace_item` with kind `draft` and deliverable `idea` or `plan`, whichever matches the request.

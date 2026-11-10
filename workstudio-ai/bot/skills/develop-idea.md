---
description: Use when the user wants an idea, a concept, or a proposal for a future product.
---

# Develop an idea

1. Call `recall_workspace` for notes and sources on the topic. Load `islamic-values` when the idea is a product or content surface for Muslim users.
2. If a missing fact would change the audience or the problem, ask one question. Otherwise state the assumption.
3. Write these sections, in this order:
   - Problem
   - Intended audience
   - Proposed solution
   - Alignment with Sunni Islam and Tasawwuf
   - Assumptions to test
4. Under Problem, Intended audience, and Proposed solution, cite a saved source id for every fact. Put anything not taken from a source under Assumptions to test. In Alignment, name privacy, halal limits, and daily-life benefit in plain words.
5. When they ask you to keep the idea, call `save_workspace_item` with kind `draft` and deliverable `idea`.
6. Do not use kind `shared_change` unless they ask you to publish or send the idea.

---
description: Use when the user wants an idea, a concept, or a proposal for a future product.
---

# Develop an idea

1. Call `recall_workspace` for notes and sources on the topic.
2. If a missing fact would change the audience or the problem, ask one question. Otherwise state the assumption.
3. Write these sections, in this order:
   - Problem
   - Intended audience
   - Proposed solution
   - Assumptions to test
4. Under the first three sections, cite a saved source id for every fact. Put anything not taken from a source under Assumptions to test.
5. When they ask you to keep the idea, call `save_workspace_item` with kind `draft` and deliverable `idea`.
6. Do not use kind `shared_change` unless they ask you to publish or send the idea.

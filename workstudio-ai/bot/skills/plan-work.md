---
description: Use when the user wants a work plan, a task list, or a sequence of actions.
---

# Plan work

1. Call `recall_workspace` for notes and drafts that constrain the plan. Load `islamic-values` when the plan covers content rules, privacy, or religious fit.
2. If a missing fact would change the sequence, ask one question. Otherwise state the assumption.
3. List each action with:
   - Action
   - Depends on
   - Owner
   - Date
4. Write TBD for an owner or a date that the user or a saved source did not state. Do not invent either one. Put a scholar review action on any ambiguous religious claim.
5. Cite a source id next to any fact you use.
6. When they ask you to keep the plan, call `save_workspace_item` with kind `draft` and deliverable `plan`.

---
description: Use when the user wants slides or speaker notes.
---

# Prepare a presentation

1. Call `recall_workspace` for the idea, plan, or sources the slides should use. Load `islamic-values` when the deck presents religious or product-values claims.
2. Write one slide per main point. The slide heading is that point, in one sentence.
3. Add speaker notes when the slide needs a number, an example, or a transition. A title slide can omit them. Keep worship and ethics claims humble. Do not invent a fatwa on a slide.
4. Cite a saved source id next to any fact. Label an assumption in the speaker notes.
5. When they ask you to keep the deck, call `save_workspace_item` with kind `draft` and deliverable `presentation`.
6. Do not use kind `shared_change` unless they ask you to send or publish the deck.

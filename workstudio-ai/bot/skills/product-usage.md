---
description: Use when the user wants product utilization, adoption, or how people use a product.
---

# Explain product usage

1. Call `recall_workspace` and separate the sources by product. Load `islamic-values` when the person asks whether usage stays within Islamic values.
2. For each product, write four sections in this order:
   - Measured adoption
   - Observations from interviews and notes
   - Values fit (privacy, halal content, useful daily-life use)
   - Assumptions
3. Measured adoption may include only a source whose evidence is `measured` and that has a citation. Repeat the citation and the source id.
4. Put evidence `interview` and evidence `note` under Observations. Do not move those into Measured adoption.
5. If a product has no measured source, write: Measured adoption: none in the workspace.
6. Do not combine products into one adoption number unless a measured source already states that combined number.
7. When they ask you to keep the analysis, call `save_workspace_item` with kind `draft` and deliverable `usage`.

# Agent log

## 2026-11-18: Assignment requirements, implementation, and validation

- **Tool:** ChatGPT Codex in the Codex desktop app.
- **Key prompt excerpt (verbatim):** “我想让你先完成这项作业”.
- **Scope:** The student requested completion of the website assignment and signed into GitHub when requested. Codex summarized the assignment requirements before implementing the site.
- **Agent produced:** A public repository generated from the instructor's starter template; the Campus & Keys HTML/CSS/JavaScript dashboard; linked campus, city, distance, and price filters; city price and distribution charts; median sale price, price per square foot, and days-on-market metrics; a sortable, paginated sales table with CSV export; methodology, citation, and README documentation.
- **Data decisions:** Codex read `AGENTS.md` and `docs/data_description_sheet.md` before analysis. The original five data files were retained unchanged. All views apply the inclusive $10,000–$5,000,000 price rule. Missing dates are not treated as zero, positive living area is required for price per square foot, and repeated addresses are retained.
- **Checks performed by Codex:** JavaScript parsing and five statistical scenarios were checked against independent calculations from the supplied SQLite file. Codex used the browser to check filters, a zero-result selection, sorting, pagination, and a 390-pixel mobile viewport. These are agent-performed checks, not claims of independent student review.
- **An error and its correction:** Codex initially entered a typo (“college-ton”) in the GitHub repository description. The browser state exposed it, and Codex corrected it to “college-town” before creating the repository. During code review, Codex also replaced a long missing-metric label with a dash to keep empty selections readable in the metric cards.
- **Student review:** The student has not yet reported a separate review of the completed site's calculations or presentation. This log summarizes the session; it is not a verbatim transcript of every tool call.

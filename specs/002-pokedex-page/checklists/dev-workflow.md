# Development Workflow Checklist: Pokedex Page

**Purpose**: Validate completeness, clarity, consistency, and measurability of the per-task development workflow requirements (commits, GitHub issues, Playwright MCP verification).
**Created**: 2026-05-24
**Feature**: [spec.md](../spec.md) | [tasks.md](../tasks.md)

**Note**: This checklist tests the REQUIREMENTS that define the development workflow — NOT whether the workflow is being followed. It asks: "Are the rules well-written and unambiguous?"

---

## Requirement Completeness — Commit Discipline

- [x] CHK001 Are commit frequency requirements defined for EVERY task type (code creation, config changes, test-only, CLI scaffolding, and directory creation)? [Completeness, Constitution §Per-Task Execution Cycle Step 4]
- [x] CHK002 Is the per-task commit message format specified with exact syntax (e.g., `Txxx: <description> (closes #N)`)? [Completeness, Constitution §Step 4]
- [x] CHK003 Are commit requirements specified for tasks marked `[P]` (parallel) — must they be committed individually even when implemented in the same session? [Completeness, Constitution §Enforcement]
- [x] CHK004 Are commit requirements defined for tasks that span multiple files within a single logical unit (e.g., T016 creates both `.ts` and `.html`)? [Completeness, tasks.md §Notes]
- [x] CHK005 Is the prohibition against batch/bundle commits ("NEVER commit more than one task per commit") quantified — does it cover amended commits, squashed commits, or only initial commits? [Clarity, Constitution §Enforcement]
- [x] CHK006 Are requirements defined for commit ordering when multiple sequential tasks modify the same file (e.g., T002 and T017 both touch `app.config.ts`)? [Coverage, tasks.md Phase 1]
- [x] CHK007 Does the workflow specification define what constitutes a "logical group" exception for batching commits, and is this exception clearly scoped? [Ambiguity, tasks.md §Notes: "Commit after each task or logical group"] — *Resolved: Constitution v1.8.0 eliminated all exceptions. There is no "logical group" exception — every task is committed individually.*

---

## Requirement Completeness — GitHub Issue Integration

- [x] CHK008 Are task-to-GitHub-issue mapping rules specified — is there a required naming convention, automatic creation via `speckit.taskstoissues`, or manual mapping? [Completeness, Constitution §Step 5]
- [x] CHK009 Is the GitHub issue closure format specified in requirements (update body with SHA, then close)? [Completeness, Constitution §Step 5]
- [ ] CHK010 Are requirements defined for what happens when a task has no corresponding GitHub issue — must one be created first, or is there a documented skip procedure? [Coverage, Gap] — *Gap: no skip procedure documented.*
- [ ] CHK011 Are requirements defined for issue numbering (`#N`) when tasks are reordered, inserted, or deleted — how is the N-to-Txxx mapping maintained? [Coverage, Gap] — *Gap: no reordering policy documented.*
- [x] CHK012 Is the issue closure validation rule ("reopen and fix if SHA missing") specified with observable/measurable criteria? [Measurability, Constitution §Enforcement]
- [x] CHK013 Are requirements defined for who/what creates the initial GitHub issues — `speckit.taskstoissues`, manual creation, or automated on first commit? [Gap, AGENTS.md §Speckit workflow]

---

## Requirement Completeness — Playwright MCP Verification

- [ ] CHK014 Are Playwright MCP verification scope requirements specified per task — which pages to verify, which interactions to test, what to snapshot? [Completeness, AGENTS.md §Per-task verification] — *Partial: tools listed but no per-task page/interaction enumeration.*
- [ ] CHK015 Are screenshot/snapshot artifact requirements defined (format, naming convention, storage path `test-screenshots/`)? [Completeness, Constitution §Step 3] — *Partial: path specified (`test-screenshots/`) but format and naming convention not defined.*
- [x] CHK016 Are requirements defined for tasks with no visible browser impact — is the skip condition "documented" with a specific format or location? [Clarity, Constitution §Step 3]
- [ ] CHK017 Are Playwright MCP verification requirements specified for server-side tasks (e.g., T002 HTTP config, T017 store logic) — is SSR rendering verification required or only client-side? [Coverage, Gap] — *Gap: SSR verification scope not specified.*
- [ ] CHK018 Are accessibility verification requirements (AXE checks) specified within the Playwright MCP verification step, or are they only covered in separate E2E tests? [Coverage, AGENTS.md §Testing] — *Gap: accessibility is only in separate E2E tests (T026), not in per-task Playwright MCP.*
- [x] CHK019 Is the Playwright MCP tool list (`playwright_browser_navigate`, `playwright_browser_snapshot`, `playwright_browser_take_screenshot`) specified as mandatory or recommended in the requirements? [Clarity, Constitution §Step 3]

---

## Requirement Consistency — Cross-Document Alignment

- [x] CHK020 Do commit discipline requirements align between the constitution (per-task, exact 5-step cycle) and tasks.md notes ("Commit after each task or logical group") — is "logical group" a defined exception or a conflict? [Consistency, Constitution §Step 4 vs tasks.md §Notes]
- [x] CHK021 Do Playwright MCP requirements align between AGENTS.md ("After every task, run `ng test` then use Playwright MCP") and the constitution §Step 3 (Playwright MCP after automated tests pass) — is the order identical? [Consistency, AGENTS.md §Testing vs Constitution §Step 3]
- [x] CHK022 Are the per-task workflow requirements consistent across all task types — do setup tasks (T001–T003) and polish tasks (T024–T027) follow the same 5-step cycle as implementation tasks? [Consistency, Constitution §Enforcement]
- [x] CHK023 Do checkpoint validation requirements in tasks.md (e.g., "Stop and validate" after US1) align with or conflict with the per-task cycle — can a checkpoint replace per-task verification? [Consistency, tasks.md §Implementation Strategy vs Constitution §Enforcement]
- [x] CHK024 Are test coverage thresholds (80% line/branch/function) specified consistently across constitution, AGENTS.md, and vitest-base.config.ts — is there a single authoritative source? [Consistency, Constitution §IV vs AGENTS.md §Testing]

---

## Scenario Coverage — Exception & Edge Cases

- [x] CHK025 Are workflow requirements defined for the scenario where `ng test` fails after a task implementation — is the fix→re-test→re-commit cycle explicitly specified? [Coverage, Constitution §Step 2]
- [ ] CHK026 Are requirements defined for when Playwright MCP is unavailable or fails — is there a documented fallback or retry procedure? [Coverage, Gap] — *Gap: no fallback procedure documented.*
- [ ] CHK027 Are workflow requirements specified for tasks that require `ng build` (SSR) rather than `ng serve` — which test command applies to which task type? [Coverage, Gap] — *Gap: no task-type-specific test command rules documented.*
- [ ] CHK028 Are requirements defined for tasks that modify configuration or infrastructure (e.g., T002, T017 in `app.config.ts`) — is a full application restart required before verification? [Coverage, Gap] — *Gap: no restart requirements documented.*
- [ ] CHK029 Are workflow requirements specified for the "no more tasks" terminal state after T027 — is there a final commit, tag, or release step defined? [Coverage, Gap] — *Gap: no terminal state procedure documented.*

---

## Measurability — Objective Verification

- [x] CHK030 Can "one task per commit" be objectively verified — are the criteria unambiguous (e.g., git diff scope, file count, or task ID count)? [Measurability, Constitution §Enforcement]
- [x] CHK031 Is the GitHub issue closure verification criteria ("include the commit SHA") specified in a format that can be checked programmatically? [Measurability, Constitution §Step 5]
- [ ] CHK032 Can Playwright MCP verification completion be objectively measured — are required screenshots enumerated, or is "manual verification" inherently subjective? [Measurability, Constitution §Step 3] — *Partial: screenshots required but no enumeration of required screenshots per task.*
- [x] CHK033 Are task completion criteria (all 5 steps done) defined with pass/fail conditions for each step, or is step completion self-reported by the agent? [Measurability, Constitution §Enforcement]
- [x] CHK034 Do the requirements specify who or what validates the 5-step cycle was followed — is it self-enforced by the agent, reviewer-verified, or CI-automated? [Measurability, Constitution §Enforcement]

---

## Dependencies & Assumptions

- [ ] CHK035 Is the assumption that the `github` MCP server is available for issue closure (Step 5) documented as a prerequisite? [Assumption, Constitution §Step 5] — *Gap: not documented as explicit prerequisite.*
- [ ] CHK036 Is the assumption that `git` and GitHub CLI/API are configured before task execution documented as a prerequisite? [Assumption, Gap] — *Gap: not documented as explicit prerequisite.*
- [ ] CHK037 Are the dependencies between workflow tools (`ng test` → Playwright MCP → `git commit` → `github_issue_write`) specified with failure propagation rules? [Dependency, Constitution §§Step 2–5] — *Gap: failure propagation rules not documented.*
- [x] CHK038 Is the `test-screenshots/` directory gitignored per requirements — is this assumption verified at project init or per-task? [Assumption, AGENTS.md §Testing]

---

## Notes

- Check items off as completed: `[x]`
- Add findings or clarifications inline
- Items reference the constitution (authoritative source), AGENTS.md, and tasks.md
- Gaps identified should be resolved before implementation of 002-pokedex-page begins

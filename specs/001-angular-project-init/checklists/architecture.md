# Architecture & Infrastructure Requirements Checklist: Initialize Angular Project

**Purpose**: Validate requirements quality for architecture, testing, SSR, and styling domains
**Created**: 2026-05-24
**Feature**: [spec.md](../spec.md)

## Requirement Completeness

- [ ] CHK001 - Are Clean Architecture layer requirements complete for all four layers (Domain, Application, Infrastructure, Presentation)? [Completeness, Plan §Constitution Check VII]
- [ ] CHK002 - Are requirements specified for the post-scaffold directory restructuring into domain/application/infrastructure/presentation? [Gap, Data Model]
- [ ] CHK003 - Are NgRx SignalStore installation and configuration requirements documented? [Gap, Plan §Summary]
- [ ] CHK004 - Are SSR server configuration requirements defined beyond the `--ssr` flag? [Completeness, Spec §FR-008]
- [ ] CHK005 - Are Tailwind CSS configuration requirements (theme, purge, plugins) specified? [Gap, Spec §FR-004]
- [ ] CHK006 - Are coverage threshold configuration requirements documented for the Vitest config? [Gap, Spec §FR-005]
- [ ] CHK007 - Are Playwright E2E test configuration requirements specified? [Gap, Constitution §IV]
- [ ] CHK008 - Are accessibility requirement gates (AXE checks, WCAG AA) reflected in project setup requirements? [Gap, Constitution §VIII]

## Requirement Clarity

- [ ] CHK009 - Is the Clean Architecture dependency direction (Presentation → Application → Infrastructure → Domain) explicitly stated with enforcement rules? [Clarity, Constitution §VII]
- [ ] CHK010 - Is "SSR configured and functional" quantified with specific verification criteria beyond `ng serve`? [Clarity, Spec §FR-008]
- [ ] CHK011 - Is the 80% coverage threshold broken down by layer (domain unit tests, store tests, component tests)? [Clarity, Constitution §IV]
- [ ] CHK012 - Is the Vitest test runner version or Angular builder integration explicitly specified? [Clarity, Spec §FR-005]
- [ ] CHK013 - Are Playwright E2E test scope and browser targets defined? [Clarity, Constitution §IV]
- [ ] CHK014 - Is "Tailwind CSS configured" defined with specific acceptance criteria (e.g., utility classes work in components)? [Clarity, Spec §FR-004]

## Requirement Consistency

- [ ] CHK015 - Do the spec's FR-001 flags (`--standalone --routing --style=tailwind --ssr`) align with the plan's quickstart command? [Consistency, Spec §FR-001, Quickstart]
- [ ] CHK016 - Are the constitution's layer conventions (Domain/Application/Infrastructure/Presentation) consistent with the plan's directory structure? [Consistency, Constitution §VII, Plan §Structure]
- [ ] CHK017 - Does the Vitest testing requirement (Spec §FR-005) align with the coverage mandate (Constitution §IV)? [Consistency]
- [ ] CHK018 - Are the spec's testing framework requirements consistent between Vitest (unit) and Playwright (E2E) with no overlap or conflict? [Consistency, Spec §FR-005, Constitution §IV]

## Acceptance Criteria Quality

- [ ] CHK019 - Can SC-001 ("application starts in under 30 seconds") be objectively measured in CI? [Measurability, Spec §SC-001]
- [ ] CHK020 - Can SC-002 ("build completes without errors or warnings") distinguish between critical and non-critical warnings? [Measurability, Spec §SC-002]
- [ ] CHK021 - Can SC-003 ("tests execute and all pass") be verified when coverage thresholds are included? [Measurability, Spec §SC-003]
- [ ] CHK022 - Can SC-005 ("SSR build completes without errors") be verified independently from SC-002 (client build)? [Measurability, Spec §SC-005]

## Scenario Coverage

- [ ] CHK023 - Are requirements defined for the scenario where the Clean Architecture directory structure already exists (e.g., re-scaffold)? [Coverage, Edge Case]
- [ ] CHK024 - Are requirements specified for SSR hydration failure scenarios? [Coverage, Gap]
- [ ] CHK025 - Are requirements defined for Tailwind CSS build failure or missing configuration? [Coverage, Edge Case]
- [ ] CHK026 - Are requirements specified for Vitest configuration conflicts (e.g., existing karma config)? [Coverage, Edge Case]
- [ ] CHK027 - Are requirements defined for the scenario where `ng new` is run on a directory with a different Angular version already installed globally? [Coverage, Spec Edge Cases]

## Edge Case Coverage

- [ ] CHK028 - Is the behavior specified when the `--style=tailwind` flag is used but `tailwindcss` package installation fails? [Edge Case, Spec §FR-004]
- [ ] CHK029 - Is the behavior defined when the `--ssr` flag is used but Node.js version is incompatible with the SSR server? [Edge Case, Spec §FR-008]
- [ ] CHK030 - Are edge cases defined for partial scaffold success (e.g., CLI creates files but npm install fails)? [Edge Case, Spec Edge Cases]

## Non-Functional Requirements

- [ ] CHK031 - Are performance requirements specified for SSR server startup time? [Gap, NFR]
- [ ] CHK032 - Are accessibility requirements (AXE, WCAG AA) traceable to specific setup steps or configuration? [Gap, Constitution §VIII]
- [ ] CHK033 - Are bundle size or build time constraints specified for the initial scaffold? [Gap, NFR]
- [ ] CHK034 - Are security requirements specified for the SSR server (e.g., CSP headers, HTTPS)? [Gap, NFR]

## Dependencies & Assumptions

- [ ] CHK035 - Are all npm package dependencies explicitly listed with expected versions? [Completeness, Spec Dependencies]
- [ ] CHK036 - Is the assumption "developer has Node.js and npm installed" validated with minimum version requirements? [Clarity, Spec Assumptions]
- [ ] CHK037 - Is the assumption "no previous Angular application" validated with a concrete check or override mechanism? [Clarity, Spec Assumptions]
- [ ] CHK038 - Are the NgRx SignalStore peer dependencies (Angular version, signals support) documented? [Gap, Dependencies]

## Ambiguities & Conflicts

- [ ] CHK039 - Is there a conflict between "use the current directory" (plan) and `ng new opencode_angular` creating a subdirectory? [Conflict, Plan §Quickstart]
  → **RESOLVED**: Use `--directory=.` to scaffold in current directory.
- [ ] CHK040 - Is the convention for component selector prefix consistent between the spec (implicit `app`) and constitution (no explicit rule)? [Ambiguity]

## Directory Behavior (post-clarification)

- [ ] CHK041 - Is the `--directory=.` flag consistently specified across all scenarios (spec FR-001, acceptance scenario 1, quickstart)? [Consistency, Spec §FR-001]
- [ ] CHK042 - Does the spec clarify that `ng new opencode_angular --directory=.` creates the project IN the current directory, not inside a subfolder? [Clarity, Spec §FR-001]
- [ ] CHK043 - Is the behavior defined when `ng new --directory=.` encounters an existing `package.json` or `src/` in the current directory? [Edge Case, Spec Edge Cases]
- [ ] CHK044 - Does the quickstart command exactly match the spec's FR-001 flags in the correct order? [Consistency, Spec §FR-001, Quickstart]

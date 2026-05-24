# Testing Checklist: Initialize Angular Project

**Purpose**: Validate the quality, clarity, and completeness of testing requirements (framework, coverage, test types, verification)
**Created**: 2026-05-24
**Feature**: [spec.md](./spec.md)

## Requirement Completeness

- [X] CHK001 - Is the unit testing framework explicitly specified (Vitest)? [Completeness, Spec §FR-005]
- [X] CHK002 - Are coverage thresholds documented with specific percentages for line, branch, and function? [Completeness, Tasks §T024, Constitution §IV]
- [X] CHK003 - Is the E2E testing framework specified (Playwright)? [Completeness, Tasks §T028, Constitution §IV]
- [X] CHK004 - Are accessibility testing requirements defined (AXE)? [Completeness, Tasks §T033, Constitution §VIII]
- [X] CHK005 - Are Angular-specific testing patterns documented (TestBed, component tests)? [Completeness, Constitution §Testing by layer]
- [ ] CHK006 - Are test execution commands defined for all test types (unit, integration, E2E)? [Completeness — `ng test` for unit, `npx playwright test` implied for E2E, deferred]

## Requirement Clarity

- [X] CHK007 - Is "default tests execute and pass" clearly defined — which tests, how many, pass criteria? [Clarity, Spec §SC-003]
- [X] CHK008 - Are "80% line coverage" boundaries clearly defined (what counts as a line)? [Clarity — standard istanbul/Vitest definition suffices]
- [X] CHK009 - Is the distinction between unit, integration, and E2E tests clearly documented with scope boundaries? [Clarity, Constitution §IV, §Testing by layer]
- [X] CHK010 - Is "ng test works without additional setup" defined with specific expectations? [Clarity, Spec §FR-005]
- [X] CHK011 - Are the Vitest configuration requirements clearly specified (where, what settings)? [Clarity, Tasks §T024]

## Requirement Consistency

- [X] CHK012 - Do the testing requirements align between spec §FR-005, constitution §IV, and tasks §T014/T019/T024? [Consistency]
- [X] CHK013 - Is the coverage threshold requirement consistent between plan §Constraints (80%) and tasks §T024 (80%)? [Consistency]
- [X] CHK014 - Are the E2E testing requirements consistent between spec and tasks? [Consistency]

## Acceptance Criteria Quality

- [X] CHK015 - Is "ng test passes" defined with specific acceptance criteria (all tests green, coverage thresholds met)? [Measurability, Spec §SC-003, Constitution §IV]
- [X] CHK016 - Can "coverage thresholds enforced in Vitest config" be objectively verified? [Measurability, Tasks §T024]
- [X] CHK017 - Are the E2E test success criteria measurable and repeatable? [Measurability, Tasks §T028]

## Scenario Coverage

- [ ] CHK018 - Are requirements defined for running tests when no tests exist yet (initial scaffold)? [Coverage — deferred, Angular generates default tests]
- [ ] CHK019 - Are requirements defined for continuous integration test execution? [Coverage — deferred, out of scope for init]
- [ ] CHK020 - Are requirements defined for test execution in SSR context? [Coverage — deferred, T021 covers SSR build validation]
- [X] CHK021 - Are requirements defined for component testing with mocked SignalStores? [Coverage, Constitution §Testing by layer]
- [X] CHK022 - Are requirements defined for testing domain layer in isolation (no TestBed)? [Coverage, Constitution §Testing by layer]

## Edge Case Coverage

- [ ] CHK023 - Is the behavior defined when Vitest configuration is incompatible with Angular CLI defaults? [Edge Case — deferred, Angular CLI's `--style=tailwind` + `--standalone` generates compatible config]
- [ ] CHK024 - Are requirements defined for handling flaky E2E tests (retries, timeouts)? [Edge Case — deferred]
- [ ] CHK025 - Is the behavior specified when coverage thresholds are not met (block build, warn only)? [Edge Case — deferred, standard behavior: fails test run]
- [ ] CHK026 - Are requirements defined for testing error/loading/empty states in components? [Edge Case — deferred, no async components in scaffold]

## Non-Functional Requirements

- [ ] CHK027 - Are test execution time performance requirements defined? [Non-Functional — deferred]
- [ ] CHK028 - Are requirements defined for test isolation (database, network, state)? [Non-Functional — deferred]
- [X] CHK029 - Are accessibility test coverage requirements quantified (AXE ruleset, WCAG level)? [Non-Functional, Constitution §VIII — WCAG AA specified]

## Dependencies & Assumptions

- [ ] CHK030 - Is the dependency on `@angular-devkit/build-angular:vite-test` or equivalent documented? [Dependency — deferred, Angular CLI v20+ default]
- [X] CHK031 - Is the assumption that Vitest replaces Jasmine/Karma documented? [Assumption, Spec §Assumptions]
- [ ] CHK032 - Is the assumption that Playwright browsers are available for E2E tests documented? [Assumption — deferred]
- [X] CHK033 - Is the dependency on `@axe-core/playwright` for accessibility testing documented? [Dependency, Tasks §T033]

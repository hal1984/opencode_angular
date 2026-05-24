# Scaffold Checklist: Initialize Angular Project

**Purpose**: Validate the quality, clarity, and completeness of scaffolding requirements (CLI flags, project structure, configuration files)
**Created**: 2026-05-24
**Feature**: [spec.md](./spec.md)

## Requirement Completeness

- [X] CHK001 - Are all `ng new` flags explicitly enumerated (`--standalone`, `--routing`, `--style=tailwind`, `--ssr`, `--strict`, `--skip-git`, `--defaults`)? [Completeness, Spec §FR-001, Tasks §T005]
- [X] CHK002 - Are post-scaffold file structure requirements defined (angular.json, package.json, tsconfig.json, src/)? [Completeness, Tasks §T006]
- [X] CHK003 - Are Tailwind CSS configuration files and their contents specified? [Completeness, Tasks §T007]
- [X] CHK004 - Are SSR configuration file requirements documented (server.ts, main.server.ts, app.config.server.ts)? [Completeness, Tasks §T008]
- [X] CHK005 - Are standalone component verification criteria specified (no NgModule imports, no explicit standalone: true)? [Completeness, Tasks §T009]
- [X] CHK006 - Are routing configuration verification requirements defined (app.routes.ts, app.config.ts)? [Completeness, Tasks §T010]

## Requirement Clarity

- [X] CHK007 - Is the `--directory=.` flag behavior clearly documented (files at root vs subdirectory)? [Clarity, Spec §FR-001]
- [X] CHK008 - Is "Tailwind CSS configured" quantified with specific files and content expectations? [Clarity, Tasks §T007]
- [X] CHK009 - Is "SSR configured" defined with verifiable file presence criteria? [Clarity, Tasks §T008]
- [X] CHK010 - Are "standalone components" clearly defined in terms of decorator properties? [Clarity, Tasks §T009, Constitution §VIII]
- [X] CHK011 - Is "compiles without errors" defined (exit code zero, no warnings, no errors)? [Clarity, Spec §SC-002]

## Requirement Consistency

- [X] CHK012 - Do the `ng new` flags in spec §FR-001 match the command in tasks §T005? [Consistency, Spec §FR-001 vs Tasks §T005]
- [X] CHK013 - Are the Tailwind CSS requirements consistent between spec, plan, and tasks? [Consistency]
- [X] CHK014 - Are the verification steps for US1 consistent across the spec acceptance scenarios and task descriptions? [Consistency]

## Acceptance Criteria Quality

- [X] CHK015 - Is "default Angular welcome page renders correctly" defined with specific visual/behavioral criteria? [Measurability, Spec §US1 Independent Test]
- [X] CHK016 - Can "ng serve compiles without errors" be objectively verified? [Measurability, Spec §SC-002]
- [X] CHK017 - Is the SSR verification criterion measurable (specific HTML content expected)? [Measurability, Tasks §T035]

## Scenario Coverage

- [ ] CHK018 - Are requirements defined for the scenario where `ng new` prompts for confirmation despite `--defaults`? [Coverage — deferred, CLI non-interactive mode handles this]
- [ ] CHK019 - Are requirements defined for handling npm dependency installation failures during scaffolding? [Coverage — deferred, CLI error output is sufficient for init]
- [ ] CHK020 - Are requirements defined for verifying the scaffold on a second run (idempotency)? [Coverage — deferred, not in scope for initial project creation]

## Edge Case Coverage

- [X] CHK021 - Is the behavior specified when `ng new` encounters an existing directory with conflicting files? [Edge Case, Spec §Edge Cases]
- [ ] CHK022 - Is the behavior defined when Angular CLI version is incompatible with requested flags? [Edge Case — deferred, T002 verifies CLI availability]
- [ ] CHK023 - Is the behavior specified when `--style=tailwind` flag is not supported by the installed CLI version? [Edge Case — deferred, same as CHK022]
- [ ] CHK024 - Is the behavior defined when network is unavailable for npm install during scaffold? [Edge Case — deferred, npm handles network errors with standard exit codes]

## Non-Functional Requirements

- [X] CHK025 - Are performance requirements defined for `ng serve` startup time? [Non-Functional, Spec §SC-001]
- [ ] CHK026 - Are build performance thresholds specified for production builds? [Non-Functional — deferred, not in scope for empty scaffold]
- [ ] CHK027 - Are disk space requirements documented for the scaffolded project? [Non-Functional — deferred, not in scope]

## Dependencies & Assumptions

- [X] CHK028 - Is the dependency on `@angular/cli` availability through npx documented? [Dependency, Spec §Dependencies]
- [X] CHK029 - Is the assumption about Node.js and npm versions validated? [Assumption, Spec §Assumptions, Tasks §T003]
- [X] CHK030 - Is the assumption that `--style=tailwind` produces a `tailwind.config.js` file documented? [Assumption — validated by T007 verification step]

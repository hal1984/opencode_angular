# Implementation Plan: Initialize Angular Project

**Branch**: `001-angular-project-init` | **Date**: 2026-05-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-angular-project-init/spec.md`

## Summary

Run `ng new opencode_angular` with `--standalone --routing --style=tailwind --ssr`
flags to scaffold a modern Angular v20+ application in the current working
directory. The project MUST include Tailwind CSS, SSR, Vitest, and TypeScript
strict mode out of the box.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)

**Primary Dependencies**: Angular v20+ (latest stable), `@ngrx/signals`,
`tailwindcss`, `@angular/ssr`

**Storage**: N/A (no persistent storage at initialization)

**Testing**: Vitest (unit + integration), Playwright (E2E)

**Target Platform**: Web browser + Node.js SSR server

**Project Type**: Web application (SSR)

**Performance Goals**: First `ng serve` startup <30s, SSR hydration <3s

**Constraints**: Min 80% line/branch/function coverage enforced via Vitest config

**Scale/Scope**: Single application, 1 developer, initial scaffold only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Scaffolding-First | PASS | `ng new` with `--standalone --routing --style=tailwind --ssr` |
| II. Standalone Architecture | PASS | `--standalone` flag ensures no NgModules |
| III. Signals-First Reactivity | PASS | Angular v20+ defaults; `@ngrx/signals` added to deps |
| IV. Test-First | PASS | Vitest default, 80% coverage to be configured |
| V. TypeScript Strict Mode | PASS | `--strict` default in Angular v20+ |
| VI. Documentation Language (English) | PASS | All docs written in English |
| VII. Clean Architecture with NgRx SignalStore | PASS | Directory structure follows Domain/Application/Infrastructure/Presentation |
| VIII. Angular CLI Best Practices | PASS | MCP best practices consulted; `ng generate` will be used |
| IX. (Reserved) | N/A | |
| X. (Reserved) | N/A | |

## Project Structure

### Documentation (this feature)

```text
specs/001-angular-project-init/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no external API)
├── checklists/
│   ├── architecture.md
│   ├── requirements.md
│   ├── workflow.md
│   ├── scaffold.md
│   └── testing.md
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── domain/
│   │   ├── models/
│   │   ├── use-cases/
│   │   └── repositories/
│   ├── application/
│   │   ├── stores/
│   │   └── features/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   └── data-sources/
│   └── presentation/
│       ├── pages/
│       ├── components/
│       └── layouts/
├── index.html
├── main.ts
├── main.server.ts
├── app.config.ts
├── app.config.server.ts
├── app.routes.ts
├── server.ts
└── styles.css
```

**Structure Decision**: Angular v20+ default scaffold with the Clean Architecture
directory convention from the constitution. The `app/` directory is structured
into domain, application, infrastructure, and presentation subdirectories.

## Complexity Tracking

> No violations. All constitution principles pass at initialization time.

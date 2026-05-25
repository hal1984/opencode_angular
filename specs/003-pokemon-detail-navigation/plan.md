# Implementation Plan: Pokemon Detail Navigation

**Branch**: `003-pokemon-detail-navigation` | **Date**: 2026-05-25 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-pokemon-detail-navigation/spec.md`

## Summary

Users browsing the Pokedex list can click any Pokemon card to navigate to a dedicated detail page showing comprehensive information (types, height, weight, abilities, base stats). The detail page supports direct URL access via Pokemon ID, error/loading states, and back navigation to the Pokedex list with scroll position preservation.

## Technical Context

**Language/Version**: TypeScript 5.x, Angular 21.2

**Primary Dependencies**: `@ngrx/signals` (state), `@angular/router` (navigation), `@angular/common/http` (API), `@angular/common` (NgOptimizedImage)

**Storage**: None (data fetched live from PokeAPI)

**Testing**: Vitest (unit), Playwright (E2E + AXE accessibility)

**Target Platform**: Web (SSR via Angular SSR, prerendered by default)

**Project Type**: Web application (Angular SPA with SSR)

**Performance Goals**: Page transition <2s, detail data renders <4s on broadband

**Constraints**: Clean Architecture unidirectional flow (Presentation → Application → Infrastructure → Domain), signals-first, NgRx SignalStore, OnPush change detection, no RxJS for internal state

**Scale/Scope**: Single detail page per Pokemon, ~1300 Pokemon total, one user at a time

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. Scaffolding-First | PASS | Project already scaffolded with `ng new`. No new project creation. |
| II. Standalone Architecture | PASS | All existing components are standalone. Detail page will follow same pattern. |
| III. Signals-First Reactivity | PASS | Store uses signals, `computed()`, `patchState()`. Detail store will follow same pattern. |
| IV. Test-First | PASS | Tests will be written before implementation code for each task. 80% coverage enforced. |
| V. TypeScript Strict Mode | PASS | Existing strict mode enabled. Detail entities will use strict types. |
| VI. Documentation Language | PASS | All spec/plan in English. Code comments in English. |
| VII. Clean Architecture | PASS | Well-established pattern already in codebase. Detail feature adds to all 4 layers. |
| VIII. Angular CLI Best Practices | PASS | No `standalone: true` in decorators, `input()` function, `inject()` not constructor, native control flow. |

No violations found. All gates pass without need for Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/003-pokemon-detail-navigation/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/app/
├── domain/
│   ├── models/
│   │   └── pokemon.model.ts         # EXTEND: Add PokemonDetail entity
│   └── repositories/
│       └── pokemon.repository.ts    # EXTEND: Add getPokemonById
├── application/
│   └── stores/
│       └── pokemon-detail.store.ts  # NEW: SignalStore for detail state
├── infrastructure/
│   └── data-sources/
│       └── pokeapi.datasource.ts    # EXTEND: Add getPokemonById implementation
└── presentation/
    ├── app.routes.ts                # EXTEND: Add /pokedex/:id route
    └── pages/
        ├── pokedex-page/
        │   └── pokedex-page.html    # EXTEND: Add routerLink to pokemon cards
        └── pokemon-detail-page/     # NEW: Detail page component
            ├── pokemon-detail-page.ts
            ├── pokemon-detail-page.html
            └── pokemon-detail-page.spec.ts
```

**Structure Decision**: Single Angular project following Clean Architecture. All new files follow existing patterns in each layer. No new directories beyond what's shown above.

## Complexity Tracking

No constitution violations. Not applicable.

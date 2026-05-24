# Implementation Plan: Pokedex Page

**Branch**: `002-pokedex-page` | **Date**: 2026-05-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-pokedex-page/spec.md`

## Summary

Add a "Pokedex" button to the existing home page that navigates to a new `/pokedex` route displaying a responsive card grid of Pokemon fetched from PokéAPI. The feature follows Clean Architecture with NgRx SignalStore: a `Pokemon` domain entity, a `PokemonRepository` interface, a `PokeapiDataSource` infrastructure adapter, a `PokedexStore` application SignalStore, and two presentation components (home button modification, Pokedex page). Pagination uses PokéAPI's offset/limit endpoint. Images use the official Pokemon sprite CDN derived from the Pokemon ID extracted from the API URL. No detail views — list-only per spec clarification.

## Technical Context

**Language/Version**: TypeScript (strict), Angular 21.2.0

**Primary Dependencies**: `@angular/router`, `@angular/common/http`, `@ngrx/signals` (already installed), `tailwindcss` v4

**Storage**: N/A — client-side state only, no persistence. Data fetched fresh from PokéAPI on each page visit.

**Testing**: Vitest (unit + integration), Playwright (E2E). Minimum 80% line/branch/function coverage enforced.

**Target Platform**: Web browser (SSR-capable via Express). Supports standard broadband.

**Project Type**: Single-page web application with SSR

**Performance Goals**: Page transition <3s (SC-001), initial Pokemon render <5s (SC-002), smooth grid with no layout shift through 50 Pokemon (SC-004)

**Constraints**: 15-second API timeout, 20-30 Pokemon per initial batch, zero authentication required (PokéAPI is free/public)

**Scale/Scope**: ~1000 Pokemon records from PokéAPI, 1 new route, 2 new components, 1 new SignalStore, 1 new data source

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Scaffolding-First | ✓ N/A | Project already scaffolded; adding feature to existing app |
| II. Standalone Architecture | ✓ PASS | All new components will be standalone (default in v21) |
| III. Signals-First Reactivity | ✓ PASS | Will use `signal()`, `computed()`, and NgRx SignalStore; no RxJS beyond HttpClient |
| IV. Test-First | ✓ PASS | Tests will be written before implementation per task execution cycle |
| V. TypeScript Strict Mode | ✓ PASS | All new code will use strict typing; no `any` usage |
| VI. Documentation Language | ✓ PASS | All plan/docs in English |
| VII. Clean Architecture | ✓ PASS | Follows Domain → Application → Infrastructure → Presentation layers |
| VIII. Angular CLI Best Practices | ✓ PASS | Will consult MCP tools before code generation |

**Gate Result**: ALL PASS — no violations. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-pokedex-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── pokemon-repository.md
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/app/
├── domain/
│   ├── models/
│   │   └── pokemon.model.ts          # Pokemon entity, PokemonListResponse value object
│   └── repositories/
│       └── pokemon.repository.ts     # IPokemonRepository interface
├── application/
│   └── stores/
│       ├── counter.store.ts           # (existing, unchanged)
│       └── pokedex.store.ts           # PokedexStore: state, computed, methods
├── infrastructure/
│   └── data-sources/
│       └── pokeapi.datasource.ts      # PokeapiDataSource: HTTP calls, URL extraction, DTO mapping
└── presentation/
    ├── pages/
    │   └── pokedex-page/
    │       ├── pokedex-page.ts        # Smart component: injects PokedexStore
    │       ├── pokedex-page.html      # Template: @if loading, @for grid, error state
    │       └── pokedex-page.spec.ts   # Component tests
    ├── components/
    │   └── pokemon-card/
    │       ├── pokemon-card.ts        # Dumb component: input() for Pokemon, NgOptimizedImage
    │       ├── pokemon-card.html      # Template: card with image + name
    │       └── pokemon-card.spec.ts   # Component tests
    ├── app.ts                         # (modified: add RouterLink for Pokedex button)
    ├── app.html                       # (modified: add Pokedex button)
    └── app.routes.ts                  # (modified: add /pokedex route)
```

**Structure Decision**: Follows the existing Clean Architecture layout from the project (presentation/ + application/ directories already exist). Adds the missing `domain/` and `infrastructure/` directories required by the constitution. No new top-level directories needed — all new code fits within the existing four-layer structure.

## Complexity Tracking

> No constitution violations — this section is intentionally empty.

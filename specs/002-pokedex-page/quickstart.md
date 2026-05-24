# Quickstart: Pokedex Page

**Feature**: Pokedex Page | **Date**: 2026-05-24

## Prerequisites

- Angular 21.2.0 project with existing Clean Architecture structure
- NgRx Signals (`@ngrx/signals`) installed (already in `package.json`)
- Tailwind CSS v4 configured (already in `styles.css`)

## Files to Create

| # | File | Layer | Purpose |
|---|------|-------|---------|
| 1 | `src/app/domain/models/pokemon.model.ts` | Domain | `Pokemon` entity, `PokemonListResponse` value object |
| 2 | `src/app/domain/repositories/pokemon.repository.ts` | Domain | `IPokemonRepository` interface + DI token |
| 3 | `src/app/infrastructure/data-sources/pokeapi.datasource.ts` | Infrastructure | HTTP client, URL parsing, DTO mapping |
| 4 | `src/app/application/stores/pokedex.store.ts` | Application | `PokedexStore` SignalStore |
| 5 | `src/app/presentation/components/pokemon-card/pokemon-card.ts` | Presentation | Dumb card component |
| 6 | `src/app/presentation/components/pokemon-card/pokemon-card.html` | Presentation | Card template |
| 7 | `src/app/presentation/pages/pokedex-page/pokedex-page.ts` | Presentation | Smart page component |
| 8 | `src/app/presentation/pages/pokedex-page/pokedex-page.html` | Presentation | Page template |

## Files to Modify

| # | File | Change |
|---|------|--------|
| 1 | `src/app/presentation/app.config.ts` | Add `provideHttpClient(withFetch())` |
| 2 | `src/app/presentation/app.routes.ts` | Add `/pokedex` lazy route |
| 3 | `src/app/presentation/app.html` | Add "Pokedex" button with `routerLink` |
| 4 | `src/app/presentation/app.ts` | Add `RouterLink` to imports |

## Directory Creation

```bash
mkdir -p src/app/domain/models
mkdir -p src/app/domain/repositories
mkdir -p src/app/infrastructure/data-sources
mkdir -p src/app/presentation/components/pokemon-card
mkdir -p src/app/presentation/pages/pokedex-page
```

## Dependency Injection Setup

Add to `app.config.ts`:
```typescript
import { provideHttpClient, withFetch } from '@angular/common/http';

// Inside providers array:
provideHttpClient(withFetch())
```

Register the repository implementation via DI token in `app.config.ts`:
```typescript
import { POKEMON_REPOSITORY } from './domain/repositories/pokemon.repository';
import { PokeapiDataSource } from './infrastructure/data-sources/pokeapi.datasource';

// Inside providers array:
{ provide: POKEMON_REPOSITORY, useClass: PokeapiDataSource }
```

## Verification

After implementation, verify:
1. `ng build` succeeds with no TypeScript errors
2. `ng test` passes all unit tests with ≥80% coverage
3. `npx playwright test` passes the E2E test for the Pokedex user journey
4. Home page shows "Pokedex" button → click navigates to `/pokedex` → Pokemon card grid renders

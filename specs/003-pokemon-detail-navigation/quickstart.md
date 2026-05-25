# Quickstart: Pokemon Detail Navigation

## What we're building

Click a Pokemon card on the Pokedex list → navigate to `/pokedex/:id` → see full detail page with types, stats, abilities, height, weight → back button returns to list.

## Files to create

| Layer | File | Action |
|-------|------|--------|
| Domain | `src/app/domain/models/pokemon.model.ts` | EXTEND: add `PokemonDetail`, `PokemonType`, `PokemonAbility`, `PokemonStat` |
| Domain | `src/app/domain/repositories/pokemon.repository.ts` | EXTEND: add `getPokemonById(id: number): Promise<PokemonDetail>` |
| Infrastructure | `src/app/infrastructure/data-sources/pokeapi.datasource.ts` | EXTEND: implement `getPokemonById` → `GET /pokemon/{id}` |
| Application | `src/app/application/stores/pokemon-detail.store.ts` | NEW: `PokemonDetailStore` with loading/error/detail state |
| Presentation | `src/app/presentation/app.config.ts` | EXTEND: add `withComponentInputBinding()`, `withInMemoryScrolling()` |
| Presentation | `src/app/presentation/app.routes.ts` | EXTEND: add `pokedex/:id` route |
| Presentation | `src/app/presentation/pages/pokemon-detail-page/pokemon-detail-page.ts` | NEW: detail page component |
| Presentation | `src/app/presentation/pages/pokedex-page/pokedex-page.html` | EXTEND: add `routerLink` to cards |
| Presentation | `src/app/presentation/components/pokemon-card/pokemon-card.ts` | EXTEND: add `routerLink` input |

## Build sequence

1. Domain models (add entities)
2. Repository interface (add method)
3. Infrastructure (implement API call + DTO mapping)
4. Store (SignalStore for detail state)
5. App config (enable component input binding + scroll restoration)
6. Routes (add detail route)
7. Detail page (component + template + tests)
8. Update list page (add routerLink to cards)
9. E2E tests (navigation, detail display, back, error states)

## Key patterns to follow

- **Clean Architecture**: Domain → Application → Infrastructure → Presentation
- **Signals**: `signal()`, `computed()`, `patchState()`, `input()`
- **NgRx SignalStore**: `withState`, `withProps`, `withComputed`, `withMethods`, `withHooks`
- **Router**: `withComponentInputBinding`, `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`
- **API**: `HttpClient` + `lastValueFrom()`, DTO interfaces in data source
- **Testing**: Vitest (unit), Playwright (E2E + AXE)

## API mapping

PokeAPI `/pokemon/{id}` → `PokemonDetail`:
- `height / 10` → meters
- `weight / 10` → kg
- `types[].type.name` → `PokemonType.name`
- `abilities[].ability.name` where `!is_hidden` → `PokemonAbility.name`
- `stats[].{base_stat, stat.name}` → `PokemonStat.{baseStat, name}`

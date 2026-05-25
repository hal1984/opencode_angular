# Research: Pokemon Detail Navigation

## 1. PokeAPI Detail Endpoint Shape

**Endpoint**: `GET https://pokeapi.co/api/v2/pokemon/{id}`

**Response structure** (key fields for this feature):

| Field | Type | Notes |
|-------|------|-------|
| `id` | number | Pokemon ID (e.g., 25 for Pikachu) |
| `name` | string | Pokemon name (e.g., "pikachu") |
| `height` | number | In decimeters (divide by 10 for meters) |
| `weight` | number | In hectograms (divide by 10 for kg) |
| `sprites.front_default` | string | Main front sprite URL |
| `sprites.other.official-artwork.front_default` | string | High-res artwork URL |
| `types[]` | array | Array of type objects: `{ slot: number, type: { name: string, url: string } }` |
| `abilities[]` | array | Array of ability objects: `{ is_hidden: boolean, slot: number, ability: { name: string, url: string } }` |
| `stats[]` | array | Exactly 6 entries: `{ base_stat: number, effort: number, stat: { name: string, url: string } }` |

**Stat order** (always): hp, attack, defense, special-attack, special-defense, speed

**Decision**: Use the existing `HttpClient` pattern from `pokeapi.datasource.ts` to call this endpoint. Map response to a new `PokemonDetail` domain entity.

## 2. Angular Routing Patterns

### Route param binding (signal-based)

- Enable `withComponentInputBinding()` in `app.config.ts`
- Define route `{ path: 'pokedex/:id', loadComponent: ... }` as a **sibling** route (not child)
- Read param in component: `readonly id = input.required<number, string>({ transform: Number })`

### RouterLink from cards

- Use `[routerLink]="['/pokedex', pokemon.id]"` on each Pokemon card in the list
- Since cards are presentational, add an optional `routerLink` input or wrap with `<a>` in the list page template

**Decision**: Sibling route is correct — allows `scrollPositionRestoration: 'enabled'` to work naturally.

### Scroll position restoration

- Add `withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })` to `provideRouter`
- Browser restores scroll position on back navigation automatically

**Decision**: Use built-in Angular scroll restoration. No manual scroll tracking needed.

## 3. Architecture Decisions

### PokemonDetail domain entity

- Create a new `PokemonDetail` interface in `domain/models/pokemon.model.ts` alongside the existing `Pokemon`
- Include: id, name, spriteUrl, height (in meters), weight (in kg), types, abilities, stats
- Keep as a plain TypeScript interface (no framework dependencies)

### Repository pattern

- Add `getPokemonById(id: number): Promise<PokemonDetail>` to `IPokemonRepository`
- Implement in `PokeapiDataSource` using `GET /pokemon/{id}`
- Follow existing pattern: `lastValueFrom(this.http.get<PokeApiResponse>(url))`, map to domain model

### Store pattern

- Create `PokemonDetailStore` as a new SignalStore (not extending PokedexStore)
- State: `{ pokemon: PokemonDetail | null, isLoading: boolean, error: string | null }`
- Method: `loadPokemonById(id: number)` — called from the detail component's `onInit`
- Follow existing `PokedexStore` pattern

### Component structure

- `PokemonDetailPage` — new lazy-loaded component at `presentation/pages/pokemon-detail-page/`
- Inject `PokemonDetailStore`, call `loadPokemonById(id)` on init
- Template shows loading, error, or detail content
- Include back button using `routerLink="/pokedex"`

### Card click navigation

- Add `routerLink` to `app-pokemon-card` in the list template, or add an optional `routerLink` input to the card component
- Follow existing pattern where component is purely presentational

## 4. API Response to Domain Mapping

```
PokeAPI /pokemon/{id} → PokemonDetail
  id                        → id
  name                      → name
  sprites.front_default     → spriteUrl
  height / 10               → height (meters)
  weight / 10               → weight (kg)
  types → map:
    { slot, type.name }     → [{ slot, name }]
  abilities → filter !is_hidden → map:
    ability.name            → name
  stats → map:
    { base_stat, stat.name } → [{ name, baseStat }]
```

# Research: Pokedex Page

**Feature**: Pokedex Page | **Date**: 2026-05-24

## R1: PokéAPI Integration Pattern

**Decision**: Use the list endpoint (`/api/v2/pokemon?offset=X&limit=Y`) for paginated Pokemon data and extract Pokemon IDs from result URLs to construct sprite image URLs.

**Rationale**: PokéAPI's list endpoint returns `{ count, next, previous, results: [{ name, url }] }` without sprite data. The `url` field contains the Pokemon ID (e.g., `https://pokeapi.co/api/v2/pokemon/25/` → ID 25). Extracting the ID client-side avoids N+1 API calls to individual detail endpoints. The official sprite CDN (`raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`) was confirmed functional.

**Alternatives considered**:
- **Fetch each Pokemon detail endpoint** — would require up to 20 extra HTTP requests per page. Rejected: too slow, violates SC-002 (5s render).
- **Use Pokemon TCG API** — requires an API key. Rejected per spec clarification (PokéAPI selected).
- **Use official artwork sprites** (`other/official-artwork/{id}.png`) — larger files, slower grid rendering. Rejected: standard front sprites are sufficient.

**PokéAPI response shape** (`/api/v2/pokemon?offset=0&limit=20`):
```json
{
  "count": 1350,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
}
```

**Sprite URL format**: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`

## R2: HTTP Client Setup

**Decision**: Add `provideHttpClient(withFetch())` to `app.config.ts`.

**Rationale**: The project currently has no HTTP client configured. The constitution mandates using the Fetch backend over XHR (`withFetch()`). A single provider addition in the existing `app.config.ts` is the minimal change needed. The `HttpClient` will be injected via `inject()` in the infrastructure data source.

**Alternatives considered**:
- **Native `fetch()` API** — no Angular interceptors, no testability helpers. Rejected: `HttpClient` integrates with Angular DI and testing.
- **`provideHttpClient()` without `withFetch()`** — uses XHR backend. Rejected: constitution prefers Fetch backend.

## R3: NgRx SignalStore Pattern for Async Data

**Decision**: Use `signalStore(withState(), withComputed(), withMethods(), withHooks())` pattern with `patchState()` for state updates. Inject infrastructure dependencies via `withProps()`.

**Rationale**: Follows the constitution's Clean Architecture mandate (Application layer contains SignalStores). The project already uses this pattern in `counter.store.ts`. The NgRx Signals guide recommends `withProps()` for grouping injected dependencies (like `PokeapiDataSource`). Loading/error/pagination state is managed as typed state slices.

**Store state shape**:
```typescript
type PokedexState = {
  pokemon: Pokemon[];
  isLoading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  hasMore: boolean;
};
```

**Alternatives considered**:
- **`withEntities()` from `@ngrx/signals/entities`** — adds entity management overhead for a simple list with no CRUD. Rejected: overkill for this feature.
- **RxJS `BehaviorSubject` + `async` pipe** — violates constitution's Signals-First principle. Rejected.
- **Angular `resource()` API** — experimental in v21, not yet stable. Rejected: use mature SignalStore pattern.

## R4: Pagination Strategy

**Decision**: Use explicit "Load More" button at the bottom of the grid, appending results to the existing list.

**Rationale**: The spec allows either pagination or infinite scroll (FR-007). A "Load More" button is simpler to implement, more accessible (no scroll-detection logic), and gives the user explicit control. PokéAPI supports offset/limit pagination: each call increments `offset` by `limit` (20) until `offset + limit >= count`.

**Alternatives considered**:
- **Infinite scroll (IntersectionObserver)** — more complex, requires scroll position tracking, harder to test, accessibility concerns. Rejected in favor of simplicity.
- **Traditional page-number pagination** — requires total count state and page calculation. Rejected: "Load More" is more natural for browsing.

## R5: Image Handling

**Decision**: Use Angular's `NgOptimizedImage` directive on `<img>` tags with the sprite CDN as the `ngSrc`. Provide a CSS-based fallback background color for failed loads.

**Rationale**: The constitution requires `NgOptimizedImage` for all static images. The Pokemon sprite CDN domain (`raw.githubusercontent.com`) must be added to the image loader configuration. For failed image loads, Angular's `(error)` event on `<img>` can swap to a placeholder, but a simpler CSS `background-color` fallback on the card's image container handles the visual case without JavaScript.

**Alternatives considered**:
- **Standard `<img>` with `[src]` binding** — violates constitution's NgOptimizedImage requirement. Rejected.
- **Local fallback sprite image** — requires asset bundling. Rejected: inline CSS fallback is sufficient for v1.

## R6: Routing Configuration

**Decision**: Add a lazy-loaded route `{ path: 'pokedex', loadComponent: () => import('./pages/pokedex-page/pokedex-page').then(m => m.PokedexPage) }` to `app.routes.ts`.

**Rationale**: Lazy loading keeps the initial bundle small — the Pokedex page code is only loaded when the user clicks the button. The existing `app.config.ts` already provides the router via `provideRouter(routes)`. A `routerLink` directive on the home page button handles navigation.

**Alternatives considered**:
- **Eagerly loaded component** — simpler but increases initial bundle size for a feature the user may never visit. Rejected.
- **Standalone route with `loadChildren`** — overkill for a single page. Rejected.

# Route Contract: Pokemon Detail Navigation

## Route definition

```
Path:     /pokedex/:id
Param:    id — Pokedex number (positive integer)
Type:     Sibling route (not child of /pokedex)
Lazy:     loadComponent → PokemonDetailPage
Binding:  withComponentInputBinding (param auto-bound to component input)
```

## Route table

| Path | Component | Params | Guards | Notes |
|------|-----------|--------|--------|-------|
| `/pokedex` | PokedexPage | — | — | Existing list page |
| `/pokedex/:id` | PokemonDetailPage | `id: number` | — | New detail page (sibling route) |

## Navigation rules

- Clicking a Pokemon card → `routerLink="/pokedex/{id}"` → navigates to detail
- Browser back button → returns to `/pokedex` with scroll position restored
- Direct URL entry → loads detail by ID, shows "not found" for invalid IDs
- Manual URL edit → behaves same as direct entry

## Scroll behavior

- `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`
- Back navigation from detail → list restores previous scroll position
- Forward navigation (list to detail) → scrolls to top

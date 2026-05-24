# Data Model: Pokedex Page

**Feature**: Pokedex Page | **Date**: 2026-05-24

## Domain Entities

### Pokemon

Core domain entity representing a single Pokemon entry from PokéAPI.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `number` | Numeric identifier extracted from the PokéAPI URL | Must be a positive integer |
| `name` | `string` | Pokemon name (lowercase, English) | Non-empty string |
| `spriteUrl` | `string` | URL to the official front sprite image | Must be a valid URL starting with `https://raw.githubusercontent.com/PokeAPI/` |

**Identity**: Uniquely identified by `id`. Two Pokemon objects with the same `id` represent the same Pokemon.

**Lifecycle**: Immutable value object — created from API response data, never modified after creation.

### PokemonListResponse

Value object representing a paginated API response from PokéAPI's list endpoint.

| Field | Type | Description |
|-------|------|-------------|
| `pokemon` | `Pokemon[]` | Array of Pokemon entities for the current page |
| `count` | `number` | Total number of Pokemon available in the API |
| `next` | `string \| null` | URL for the next page, or `null` if on the last page |
| `previous` | `string \| null` | URL for the previous page, or `null` if on the first page |

## Application State

### PokedexState

SignalStore state managed by `PokedexStore`.

| Field | Type | Initial | Description |
|-------|------|---------|-------------|
| `pokemon` | `Pokemon[]` | `[]` | Currently loaded Pokemon entries |
| `isLoading` | `boolean` | `false` | Whether a fetch operation is in progress |
| `error` | `string \| null` | `null` | Error message if the last fetch failed; `null` on success |
| `offset` | `number` | `0` | Current pagination offset (number of Pokemon already loaded) |
| `limit` | `number` | `20` | Number of Pokemon to fetch per request |
| `totalCount` | `number` | `0` | Total Pokemon count from the API |
| `hasMore` | `boolean` | `true` | Whether more Pokemon are available to load |

### State Transitions

```
IDLE (initial) ──[loadPokemon()]──> LOADING
LOADING ──[success]──> LOADED (append pokemon, increment offset)
LOADING ──[failure]──> ERROR (set error message)
LOADED ──[loadMore()]──> LOADING (if hasMore)
ERROR ──[loadPokemon()]──> LOADING (retry)
LOADED ──[no more]──> hasMore = false
```

## Derived Values (computed)

| Name | Type | Derivation |
|------|------|------------|
| `isEmpty` | `boolean` | `pokemon.length === 0 && !isLoading && !error` |
| `allLoaded` | `boolean` | `!hasMore && pokemon.length > 0` |

## Relationships

```
PokemonListResponse 1 ──── * Pokemon
PokedexState       1 ──── * Pokemon (loaded subset)
```

The `PokedexStore` accumulates `Pokemon[]` across multiple API calls — it does not replace the list on each load. The `PokemonListResponse` is an intermediate DTO mapped to `Pokemon[]` before being appended to state.

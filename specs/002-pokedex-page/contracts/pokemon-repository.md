# Contract: IPokemonRepository

**Feature**: Pokedex Page | **Date**: 2026-05-24

## Interface

```typescript
import { Pokemon, PokemonListResponse } from '../../models/pokemon.model';

export interface IPokemonRepository {
  getPokemonList(offset: number, limit: number): Promise<PokemonListResponse>;
}
```

## Method: `getPokemonList`

Fetches a paginated list of Pokemon from the external PokéAPI.

| Aspect | Detail |
|--------|--------|
| **Parameters** | `offset: number` — number of Pokemon to skip; `limit: number` — max Pokemon to return |
| **Returns** | `Promise<PokemonListResponse>` — resolves with Pokemon array and pagination metadata |
| **Errors** | Rejects on network failure, HTTP error status, or timeout (>15s) |
| **Idempotency** | Yes — repeated calls with same params return same data (read-only) |

## Preconditions

- PokéAPI (`pokeapi.co`) is reachable
- `offset` is a non-negative integer
- `limit` is a positive integer (typically 20)

## Postconditions

- On success: Returns a `PokemonListResponse` where `pokemon` array length ≤ `limit`
- On failure: Does not modify any application state; error propagated to caller
- Pokemon IDs are extracted from `url` fields and sprite URLs constructed

## Implementation Contract

The concrete implementation (`PokeapiDataSource`) MUST:

1. Call `GET https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={limit}`
2. Extract the Pokemon ID from each result's `url` field (regex: `/\/(\d+)\/$/`)
3. Construct `spriteUrl` as `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
4. Map API response fields to `PokemonListResponse`: `count`, `next`, `previous`, `pokemon: Pokemon[]`
5. Set a 15-second timeout (per spec SC-003)
6. Throw a descriptive error on failure (network error, non-2xx status, timeout)

## Consumer

The `PokedexStore` (Application layer) depends on this interface via Angular DI. The concrete `PokeapiDataSource` (Infrastructure layer) is provided as the implementation.

```typescript
// Domain layer — no framework imports
export interface IPokemonRepository {
  getPokemonList(offset: number, limit: number): Promise<PokemonListResponse>;
}

// Infrastructure layer — implements the interface
export class PokeapiDataSource implements IPokemonRepository {
  private readonly http = inject(HttpClient);

  async getPokemonList(offset: number, limit: number): Promise<PokemonListResponse> {
    // HTTP call + DTO mapping
  }
}

// Application layer — depends on the interface
export const PokedexStore = signalStore(
  withProps(() => ({
    repository: inject(IPokemonRepository) // resolved via DI token
  })),
  withMethods(({ repository, ...store }) => ({
    async loadPokemon(): Promise<void> {
      const response = await repository.getPokemonList(store.offset(), store.limit());
      // update state
    }
  }))
);
```

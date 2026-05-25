# External API Contract: PokeAPI Detail Endpoint

## Endpoint

```
GET https://pokeapi.co/api/v2/pokemon/{id}
```

## Request

| Param | Type | Description |
|-------|------|-------------|
| `id` | number/string | Pokedex number (e.g., 25) or name (e.g., "pikachu") |

## Response (relevant fields)

```typescript
interface PokeApiDetailResponse {
  id: number;
  name: string;
  height: number;                        // decimeters
  weight: number;                        // hectograms
  sprites: {
    front_default: string | null;        // main sprite URL
    other: {
      'official-artwork': {
        front_default: string | null;    // high-res artwork
      };
    };
  };
  types: Array<{
    slot: number;                        // 1 or 2
    type: {
      name: string;                      // "electric", "fire", etc.
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  stats: Array<{
    base_stat: number;                   // base value (e.g., 35)
    effort: number;                      // EV yield
    stat: {
      name: string;                      // "hp", "attack", etc.
      url: string;
    };
  }>;
}
```

## Error responses

| Status | Meaning | Handling |
|--------|---------|----------|
| 200 | Success | Parse and map to `PokemonDetail` |
| 404 | Not found (invalid ID or name) | Show "Pokemon not found" state |
| 5xx | Server error | Show error message with retry |
| Network error | No connection | Show error message with retry |

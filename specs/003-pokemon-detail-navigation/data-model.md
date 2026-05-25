# Data Model: Pokemon Detail Navigation

## Entities

### Pokemon (existing — extended context)

```
Pokemon {
  id:        number       // Pokedex number (1-898+)
  name:      string       // Lowercase name (e.g., "pikachu")
  spriteUrl: string       // URL to front sprite image
}
```

### PokemonDetail (NEW)

Represents the full detail data for a single Pokemon fetched from the API.

```
PokemonDetail {
  id:        number              // Pokedex number (matches Pokemon.id)
  name:      string              // Lowercase name (e.g., "pikachu")
  spriteUrl: string              // URL to main front sprite
  height:    number              // Height in meters (e.g., 0.4)
  weight:    number              // Weight in kilograms (e.g., 6.0)
  types:     PokemonType[]       // 1-2 type classifications
  abilities: PokemonAbility[]    // Non-hidden abilities
  stats:     PokemonStat[]       // Exactly 6 base stats
}
```

### PokemonType (NEW)

```
PokemonType {
  slot: number       // 1 for primary, 2 for secondary
  name: string       // Type name (e.g., "electric", "fire")
}
```

### PokemonAbility (NEW)

```
PokemonAbility {
  name: string       // Ability name (e.g., "static", "overgrow")
}
```

### PokemonStat (NEW)

```
PokemonStat {
  name:     string   // Stat name (e.g., "hp", "attack", "defense")
  baseStat: number   // Base value (e.g., 35, 55, 40)
}
```

## Relationships

```
PokemonListResponse
  └── pokemon: Pokemon[]           (list summary — no detail fields)

PokemonDetail
  ├── types:     PokemonType[]     (1-2 entries)
  ├── abilities: PokemonAbility[]  (1+ entries)
  └── stats:     PokemonStat[]     (exactly 6 entries)
```

- `Pokemon.id` === `PokemonDetail.id` — linked by Pokedex number
- There is no one-to-one reference from `Pokemon` to `PokemonDetail` in the domain model; they are independent entities fetched from different API endpoints
- `PokemonDetail` is always fetched by ID and never stored alongside the list

## Validation Rules

- **id**: Must be a positive integer (1 or greater). Must match a valid Pokedex number.
- **name**: Non-empty string, lowercase. Must correspond to a valid Pokemon name.
- **spriteUrl**: Must be a valid URL string. Image should be loadable.
- **height**: Must be a non-negative number (meters). May be 0 for very small Pokemon.
- **weight**: Must be a non-negative number (kilograms). May be 0.
- **types**: MUST contain 1 or 2 entries. Slot values MUST be unique (1 and 2).
- **abilities**: MUST contain at least 1 entry. Each has a non-empty name.
- **stats**: MUST contain exactly 6 entries with names: hp, attack, defense, special-attack, special-defense, speed. Each baseStat is a non-negative integer.

## State Transitions

### PokemonDetailStore state machine

```
INITIAL
  │  loadPokemonById(id)
  ▼
LOADING (pokemon=null, isLoading=true, error=null)
  │  API success
  ▼
  │  API failure
  ▼
LOADED (pokemon=PokemonDetail, isLoading=false, error=null)
                    ERROR (pokemon=null, isLoading=false, error=string)
                      │  retry()
                      ▼
                      LOADING (same ID)
  │  new loadPokemonById(differentId)
  ▼
LOADING (pokemon=null, isLoading=true, error=null)
```

### States

- **INITIAL**: Before any load action. Store is in default state.
- **LOADING**: Data fetch in progress. Show spinner/skeleton.
- **LOADED**: Data available. Show detail content.
- **ERROR**: Fetch failed. Show error message with retry button.

Loading a new Pokemon ID resets to LOADING state (clears previous data). Retry reuses the previous ID.

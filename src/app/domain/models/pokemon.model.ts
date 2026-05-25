export interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
}

export interface PokemonListResponse {
  pokemon: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PokemonType {
  slot: number;
  name: string;
}

export interface PokemonAbility {
  name: string;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  spriteUrl: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

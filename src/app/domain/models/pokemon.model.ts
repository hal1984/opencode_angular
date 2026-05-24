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

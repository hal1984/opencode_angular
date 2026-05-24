import { InjectionToken } from '@angular/core';
import { PokemonListResponse } from '../models/pokemon.model';

export interface IPokemonRepository {
  getPokemonList(offset: number, limit: number): Promise<PokemonListResponse>;
}

export const POKEMON_REPOSITORY = new InjectionToken<IPokemonRepository>('POKEMON_REPOSITORY');

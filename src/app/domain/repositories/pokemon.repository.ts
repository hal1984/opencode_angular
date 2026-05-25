import { InjectionToken } from '@angular/core';
import { PokemonListResponse, PokemonDetail } from '../models/pokemon.model';

export interface IPokemonRepository {
  getPokemonList(offset: number, limit: number): Promise<PokemonListResponse>;
  getPokemonById(id: number): Promise<PokemonDetail>;
}

export const POKEMON_REPOSITORY = new InjectionToken<IPokemonRepository>('POKEMON_REPOSITORY');

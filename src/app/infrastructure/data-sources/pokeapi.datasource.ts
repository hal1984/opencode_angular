import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository';
import { Pokemon, PokemonListResponse } from '../../domain/models/pokemon.model';

interface PokeApiResult {
  name: string;
  url: string;
}

interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiResult[];
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiDataSource implements IPokemonRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly spriteUrlTemplate = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  async getPokemonList(offset: number, limit: number): Promise<PokemonListResponse> {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    
    try {
      const response = await lastValueFrom(
        this.http.get<PokeApiResponse>(url)
      );

      const pokemon: Pokemon[] = response.results.map((result) => {
        const id = this.extractIdFromUrl(result.url);
        if (!id) {
          throw new Error(`Malformed Pokemon URL: ${result.url}`);
        }
        return {
          id,
          name: result.name,
          spriteUrl: `${this.spriteUrlTemplate}/${id}.png`
        };
      });

      return {
        pokemon,
        count: response.count,
        next: response.next,
        previous: response.previous
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch Pokemon list');
    }
  }

  private extractIdFromUrl(url: string): number | null {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1], 10) : null;
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository';
import {
  Pokemon,
  PokemonListResponse,
  PokemonDetail,
  PokemonType,
  PokemonAbility,
  PokemonStat
} from '../../domain/models/pokemon.model';

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

interface PokeApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokeApiAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokeApiStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokeApiDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  types: PokeApiType[];
  abilities: PokeApiAbility[];
  stats: PokeApiStat[];
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
      if (error instanceof HttpErrorResponse || error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch Pokemon list');
    }
  }

  async getPokemonById(id: number): Promise<PokemonDetail> {
    const url = `${this.baseUrl}/${id}`;

    try {
      const response = await lastValueFrom(
        this.http.get<PokeApiDetailResponse>(url)
      );

      return {
        id: response.id,
        name: response.name,
        spriteUrl: response.sprites.front_default ?? `${this.spriteUrlTemplate}/${id}.png`,
        height: response.height / 10,
        weight: response.weight / 10,
        types: response.types.map((t): PokemonType => ({
          slot: t.slot,
          name: t.type.name
        })),
        abilities: response.abilities
          .filter((a) => !a.is_hidden)
          .map((a): PokemonAbility => ({
            name: a.ability.name
          })),
        stats: response.stats.map((s): PokemonStat => ({
          name: s.stat.name,
          baseStat: s.base_stat
        }))
      };
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          throw new Error(`Pokemon with ID ${id} not found`);
        }
        throw new Error(`Failed to fetch Pokemon with ID ${id}`);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch Pokemon with ID ${id}`);
    }
  }

  private extractIdFromUrl(url: string): number | null {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1], 10) : null;
  }
}

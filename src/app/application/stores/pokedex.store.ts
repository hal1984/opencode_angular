import { inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, withHooks, withProps } from '@ngrx/signals';
import { computed } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { Pokemon, PokemonListResponse } from '../../domain/models/pokemon.model';
import { IPokemonRepository, POKEMON_REPOSITORY } from '../../domain/repositories/pokemon.repository';

interface PokedexState {
  pokemon: Pokemon[];
  isLoading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  hasMore: boolean;
}

const initialState: PokedexState = {
  pokemon: [],
  isLoading: false,
  error: null,
  offset: 0,
  limit: 20,
  hasMore: true
};

export const PokedexStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    repository: inject(POKEMON_REPOSITORY)
  })),
  withComputed((state) => ({
    isEmpty: computed(() => state.pokemon().length === 0 && !state.isLoading() && !state.error()),
    allLoaded: computed(() => !state.hasMore() && state.pokemon().length > 0)
  })),
  withMethods((state) => ({
    async loadPokemon(): Promise<void> {
      if (state.isLoading()) {
        return;
      }

      patchState(state, { isLoading: true, error: null });

      try {
        const response: PokemonListResponse = await state.repository.getPokemonList(
          state.offset(),
          state.limit()
        );

        patchState(state, {
          pokemon: [...state.pokemon(), ...response.pokemon],
          isLoading: false,
          offset: state.offset() + response.pokemon.length,
          hasMore: response.next !== null
        });
      } catch (error) {
        patchState(state, {
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load Pokemon'
        });
      }
    }
  })),
  withHooks({
    onInit(state) {
      state.loadPokemon();
    }
  })
);

export type PokedexStore = InstanceType<typeof PokedexStore>;

import { inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, withProps } from '@ngrx/signals';
import { computed } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { PokemonDetail } from '../../domain/models/pokemon.model';
import { IPokemonRepository, POKEMON_REPOSITORY } from '../../domain/repositories/pokemon.repository';

interface PokemonDetailState {
  pokemon: PokemonDetail | null;
  isLoading: boolean;
  error: string | null;
  currentId: number | null;
}

const initialState: PokemonDetailState = {
  pokemon: null,
  isLoading: false,
  error: null,
  currentId: null
};

export const PokemonDetailStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    repository: inject(POKEMON_REPOSITORY)
  })),
  withComputed((state) => ({
    hasError: computed(() => state.error() !== null),
    isLoaded: computed(() => state.pokemon() !== null && !state.isLoading())
  })),
  withMethods((state) => ({
    async loadPokemonById(id: number): Promise<void> {
      if (state.isLoading()) {
        return;
      }

      patchState(state, {
        pokemon: null,
        isLoading: true,
        error: null,
        currentId: id
      });

      try {
        const pokemon: PokemonDetail = await state.repository.getPokemonById(id);

        patchState(state, {
          pokemon,
          isLoading: false
        });
      } catch (error) {
        patchState(state, {
          isLoading: false,
          error: error instanceof Error ? error.message : `Failed to load Pokemon with ID ${id}`
        });
      }
    }
  }))
);

export type PokemonDetailStore = InstanceType<typeof PokemonDetailStore>;

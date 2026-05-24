import { TestBed } from '@angular/core/testing';
import { PokedexStore } from './pokedex.store';
import { IPokemonRepository, POKEMON_REPOSITORY } from '../../domain/repositories/pokemon.repository';
import { PokemonListResponse } from '../../domain/models/pokemon.model';
import { vi } from 'vitest';

describe('PokedexStore', () => {
  let store: PokedexStore;
  const mockRepository: IPokemonRepository = {
    getPokemonList: vi.fn().mockResolvedValue({
      pokemon: [{ id: 1, name: 'bulbasaur', spriteUrl: 'url' }],
      count: 1281,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null
    } as PokemonListResponse)
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: POKEMON_REPOSITORY, useValue: mockRepository }
      ]
    });

    store = TestBed.inject(PokedexStore);
    // Wait for onInit to complete
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    expect(store.pokemon()).toHaveLength(1);
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.offset()).toBe(1);
    expect(store.hasMore()).toBe(true);
  });

  it('should load Pokemon successfully', async () => {
    expect(store.pokemon()).toHaveLength(1);
    expect(store.pokemon()[0].name).toBe('bulbasaur');
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.offset()).toBe(1);
    expect(store.hasMore()).toBe(true);
  });

  it('should handle load failure', async () => {
    const errorRepository: IPokemonRepository = {
      getPokemonList: vi.fn().mockRejectedValue(new Error('Network error'))
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: POKEMON_REPOSITORY, useValue: errorRepository }
      ]
    });

    const errorStore = TestBed.inject(PokedexStore);
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(errorStore.error()).toBeTruthy();
    expect(errorStore.isLoading()).toBe(false);
  });

  it('should compute isEmpty correctly', () => {
    expect(store.isEmpty()).toBe(false);
  });
});

import { TestBed } from '@angular/core/testing';
import { PokemonDetailStore } from './pokemon-detail.store';
import { IPokemonRepository, POKEMON_REPOSITORY } from '../../domain/repositories/pokemon.repository';
import { PokemonDetail } from '../../domain/models/pokemon.model';
import { vi } from 'vitest';

describe('PokemonDetailStore', () => {
  const mockPokemon: PokemonDetail = {
    id: 25,
    name: 'pikachu',
    spriteUrl: 'url',
    height: 0.4,
    weight: 6.0,
    types: [{ slot: 1, name: 'electric' }],
    abilities: [{ name: 'static' }],
    stats: [
      { name: 'hp', baseStat: 35 },
      { name: 'attack', baseStat: 55 },
      { name: 'defense', baseStat: 40 },
      { name: 'special-attack', baseStat: 50 },
      { name: 'special-defense', baseStat: 50 },
      { name: 'speed', baseStat: 90 }
    ]
  };

  const mockRepository: IPokemonRepository = {
    getPokemonList: vi.fn(),
    getPokemonById: vi.fn().mockResolvedValue(mockPokemon)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: POKEMON_REPOSITORY, useValue: mockRepository }
      ]
    });

    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const store = TestBed.inject(PokemonDetailStore);
    expect(store.pokemon()).toBeNull();
    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.currentId()).toBeNull();
  });

  it('should load Pokemon detail successfully', async () => {
    const store = TestBed.inject(PokemonDetailStore);

    await store.loadPokemonById(25);

    expect(store.isLoading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.currentId()).toBe(25);
    expect(store.pokemon()).toEqual(mockPokemon);
    expect(mockRepository.getPokemonById).toHaveBeenCalledWith(25);
  });

  it('should handle load failure', async () => {
    const errorRepo: IPokemonRepository = {
      getPokemonList: vi.fn(),
      getPokemonById: vi.fn().mockRejectedValue(new Error('Network error'))
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: POKEMON_REPOSITORY, useValue: errorRepo }
      ]
    });

    const errorStore = TestBed.inject(PokemonDetailStore);

    await errorStore.loadPokemonById(25);

    expect(errorStore.isLoading()).toBe(false);
    expect(errorStore.error()).toBeTruthy();
    expect(errorStore.pokemon()).toBeNull();
  });

  it('should set loading state during fetch', async () => {
    const store = TestBed.inject(PokemonDetailStore);

    let resolvePromise!: (value: PokemonDetail) => void;
    const slowRepo: IPokemonRepository = {
      getPokemonList: vi.fn(),
      getPokemonById: vi.fn().mockImplementation(() =>
        new Promise<PokemonDetail>(resolve => { resolvePromise = resolve; })
      )
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: POKEMON_REPOSITORY, useValue: slowRepo }
      ]
    });

    const slowStore = TestBed.inject(PokemonDetailStore);

    const promise = slowStore.loadPokemonById(25);
    expect(slowStore.isLoading()).toBe(true);

    resolvePromise!(mockPokemon);
    await promise;

    expect(slowStore.isLoading()).toBe(false);
  });

  it('should prevent concurrent loadPokemonById calls', async () => {
    const store = TestBed.inject(PokemonDetailStore);

    const promise1 = store.loadPokemonById(25);
    const promise2 = store.loadPokemonById(25);

    await Promise.all([promise1, promise2]);

    expect(mockRepository.getPokemonById).toHaveBeenCalledTimes(1);
  });

  it('should reset previous data when loading a different ID', async () => {
    const store = TestBed.inject(PokemonDetailStore);

    await store.loadPokemonById(25);
    expect(store.pokemon()).not.toBeNull();

    const promise = store.loadPokemonById(4);
    expect(store.pokemon()).toBeNull();
    expect(store.isLoading()).toBe(true);

    await promise;
    expect(store.currentId()).toBe(4);
  });
});

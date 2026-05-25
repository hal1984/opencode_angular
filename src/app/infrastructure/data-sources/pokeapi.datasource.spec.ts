import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PokeapiDataSource } from './pokeapi.datasource';

describe('PokeapiDataSource', () => {
  let dataSource: PokeapiDataSource;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokeapiDataSource
      ]
    });

    dataSource = TestBed.inject(PokeapiDataSource);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPokemonList', () => {
    it('should fetch and map Pokemon list successfully', async () => {
      const mockResponse = {
        count: 1281,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      };

      const promise = dataSource.getPokemonList(0, 20);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const result = await promise;
      expect(result.pokemon).toHaveLength(2);
      expect(result.pokemon[0].name).toBe('bulbasaur');
      expect(result.pokemon[0].id).toBe(1);
      expect(result.pokemon[0].spriteUrl).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
      expect(result.count).toBe(1281);
      expect(result.next).toBe('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
      expect(result.previous).toBeNull();
    });

    it('should throw error on 404 response', async () => {
      const promise = dataSource.getPokemonList(0, 20);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      await expect(promise).rejects.toThrow();
    });

    it('should throw error on 500 response', async () => {
      const promise = dataSource.getPokemonList(0, 20);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

      await expect(promise).rejects.toThrow();
    });

    it('should throw error on network error', async () => {
      const promise = dataSource.getPokemonList(0, 20);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      req.error(new ProgressEvent('Network error'));

      await expect(promise).rejects.toThrow();
    });

    it('should return empty array for empty results', async () => {
      const mockResponse = {
        count: 0,
        next: null,
        previous: null,
        results: []
      };

      const promise = dataSource.getPokemonList(0, 20);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      req.flush(mockResponse);

      const result = await promise;
      expect(result.pokemon).toHaveLength(0);
    });

    it('should throw descriptive error for malformed URL', async () => {
      const mockResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
          { name: 'invalid', url: 'not-a-valid-url' }
        ]
      };

      const promise = dataSource.getPokemonList(0, 20);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      req.flush(mockResponse);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('getPokemonById', () => {
    it('should fetch and map Pokemon detail successfully', async () => {
      const mockResponse = {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          other: {
            'official-artwork': { front_default: null }
          }
        },
        types: [
          { slot: 1, type: { name: 'electric', url: '' } }
        ],
        abilities: [
          { ability: { name: 'static', url: '' }, is_hidden: false, slot: 1 },
          { ability: { name: 'lightning-rod', url: '' }, is_hidden: true, slot: 3 }
        ],
        stats: [
          { base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } },
          { base_stat: 55, effort: 0, stat: { name: 'attack', url: '' } },
          { base_stat: 40, effort: 0, stat: { name: 'defense', url: '' } },
          { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: '' } },
          { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: '' } },
          { base_stat: 90, effort: 2, stat: { name: 'speed', url: '' } }
        ]
      };

      const promise = dataSource.getPokemonById(25);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const result = await promise;
      expect(result.id).toBe(25);
      expect(result.name).toBe('pikachu');
      expect(result.height).toBe(0.4);
      expect(result.weight).toBe(6.0);
      expect(result.types).toHaveLength(1);
      expect(result.types[0].name).toBe('electric');
      expect(result.abilities).toHaveLength(1);
      expect(result.abilities[0].name).toBe('static');
      expect(result.stats).toHaveLength(6);
      expect(result.stats[0].name).toBe('hp');
      expect(result.stats[0].baseStat).toBe(35);
    });

    it('should throw "not found" error on 404 response', async () => {
      const promise = dataSource.getPokemonById(999999);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/999999');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      await expect(promise).rejects.toThrow(/not found/i);
    });

    it('should throw error on 500 response', async () => {
      const promise = dataSource.getPokemonById(25);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

      await expect(promise).rejects.toThrow();
    });

    it('should throw error on network error', async () => {
      const promise = dataSource.getPokemonById(25);

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
      req.error(new ProgressEvent('Network error'));

      await expect(promise).rejects.toThrow();
    });
  });
});

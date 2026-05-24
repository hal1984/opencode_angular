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

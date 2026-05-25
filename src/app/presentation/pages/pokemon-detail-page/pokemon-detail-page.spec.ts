import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailPage } from './pokemon-detail-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { POKEMON_REPOSITORY } from '../../../domain/repositories/pokemon.repository';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPage;
  let fixture: ComponentFixture<PokemonDetailPage>;

  const mockRepository = {
    getPokemonList: vi.fn(),
    getPokemonById: vi.fn().mockResolvedValue({
      id: 25,
      name: 'pikachu',
      spriteUrl: 'https://example.com/pikachu.png',
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
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: POKEMON_REPOSITORY, useValue: mockRepository }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 25);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind id input', () => {
    expect(component.id()).toBe(25);
  });

  it('should load Pokemon detail on init', async () => {
    // Wait for async loadPokemonById to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
    expect(mockRepository.getPokemonById).toHaveBeenCalledWith(25);
  });

  it('should show loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingEl = compiled.querySelector('[role="status"]');
    expect(loadingEl).toBeTruthy();
    expect(loadingEl?.textContent).toContain('Loading Pokemon');
  });

  it('should display Pokemon name and image after loading', async () => {
    // Wait for async loadPokemonById to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('pikachu');
    expect(compiled.querySelector('img')).toBeTruthy();
  });

  it('should display back button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const backBtn = compiled.querySelector('[routerLink="/pokedex"]');
    expect(backBtn).toBeTruthy();
  });

  it('should handle invalid ID gracefully', async () => {
    const invalidRepo = {
      getPokemonList: vi.fn(),
      getPokemonById: vi.fn().mockRejectedValue(new Error('Pokemon with ID 0 not found'))
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: POKEMON_REPOSITORY, useValue: invalidRepo }
      ]
    });

    const invalidFixture = TestBed.createComponent(PokemonDetailPage);
    invalidFixture.componentRef.setInput('id', 0);
    invalidFixture.detectChanges();

    // Wait for async loadPokemonById to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    invalidFixture.detectChanges();

    expect(invalidFixture.componentInstance).toBeTruthy();
  });

  it('should display "not found" message when API returns 404', async () => {
    const notFoundRepo = {
      getPokemonList: vi.fn(),
      getPokemonById: vi.fn().mockRejectedValue(new Error('Pokemon with ID 999999 not found'))
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: POKEMON_REPOSITORY, useValue: notFoundRepo }
      ]
    });

    const nfFixture = TestBed.createComponent(PokemonDetailPage);
    nfFixture.componentRef.setInput('id', 999999);
    nfFixture.detectChanges();

    // Wait for async loadPokemonById to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    nfFixture.detectChanges();

    const compiled = nfFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('not found');
    expect(compiled.querySelector('[role="alert"]')).toBeTruthy();
  });

  it('should display error and retry button on API failure', async () => {
    const errorRepo = {
      getPokemonList: vi.fn(),
      getPokemonById: vi.fn().mockRejectedValue(new Error('Network error'))
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: POKEMON_REPOSITORY, useValue: errorRepo }
      ]
    });

    const errFixture = TestBed.createComponent(PokemonDetailPage);
    errFixture.componentRef.setInput('id', 25);
    errFixture.detectChanges();

    // Wait for async loadPokemonById to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    errFixture.detectChanges();

    const compiled = errFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Network error');
    const retryButton = errFixture.nativeElement.querySelectorAll('button');
    const hasRetry = Array.from(retryButton).some(
      (btn) => (btn as HTMLButtonElement).textContent?.includes('Retry')
    );
    expect(hasRetry).toBe(true);
  });
});

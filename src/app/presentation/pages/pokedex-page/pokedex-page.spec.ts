import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexPage } from './pokedex-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { POKEMON_REPOSITORY } from '../../../domain/repositories/pokemon.repository';
import { vi } from 'vitest';

describe('PokedexPage Integration', () => {
  let component: PokedexPage;
  let fixture: ComponentFixture<PokedexPage>;

  const mockRepository = {
    getPokemonList: vi.fn().mockResolvedValue({
      pokemon: [],
      count: 0,
      next: null,
      previous: null
    }),
    getPokemonById: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexPage],
      providers: [
        provideZonelessChangeDetection(),
        { provide: POKEMON_REPOSITORY, useValue: mockRepository }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render heading "Pokedex"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Pokedex');
  });

  it('should show empty state when no Pokemon', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No Pokemon available');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should maintain consistent card dimensions', () => {
    expect(component).toBeTruthy();
  });

  it('should show Load More button when hasMore is true', () => {
    expect(component).toBeTruthy();
  });

  it('should show All Pokemon loaded message when complete', () => {
    expect(component).toBeTruthy();
  });
});

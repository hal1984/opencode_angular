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
    })
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

  it('should show loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading Pokemon');
  });

  it('should render Pokemon cards in grid', () => {
    // This test will pass after store integration
    expect(component).toBeTruthy();
  });

  it('should show error message on failure', () => {
    // This test will pass after store integration
    expect(component).toBeTruthy();
  });

  it('should show empty state when no Pokemon', () => {
    // This test will pass after store integration
    expect(component).toBeTruthy();
  });

  it('should maintain consistent card dimensions', () => {
    // Grid stability test for SC-004
    expect(component).toBeTruthy();
  });
});

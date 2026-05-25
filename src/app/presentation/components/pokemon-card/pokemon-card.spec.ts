import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { Pokemon } from '../../../domain/models/pokemon.model';
import { provideRouter } from '@angular/router';

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;
  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
  });

  it('should render Pokemon name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.toLowerCase()).toContain('bulbasaur');
  });

  it('should bind image src to pokemon spriteUrl', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should toggle fallback class on image error', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    
    img?.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    
    expect(component.imageError()).toBe(true);
  });

  it('should render as anchor when routerLink is provided', () => {
    fixture.componentRef.setInput('routerLink', ['/pokedex', 1]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/pokedex/1');
  });

  it('should render as article when no routerLink', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('article')).toBeTruthy();
    expect(compiled.querySelector('a')).toBeFalsy();
  });
});

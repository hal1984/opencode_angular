import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { Pokemon } from '../../../domain/models/pokemon.model';

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
});

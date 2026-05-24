import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PokedexStore } from '../../../application/stores/pokedex.store';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokedex-page',
  templateUrl: './pokedex-page.html',
  imports: [PokemonCard],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokedexPage {
  readonly store = inject(PokedexStore);
}

import { Component, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Pokemon } from '../../../domain/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  imports: [NgOptimizedImage]
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
  imageError = signal(false);

  onImageError() {
    this.imageError.set(true);
  }
}

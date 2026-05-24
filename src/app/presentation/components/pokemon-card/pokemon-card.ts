import { Component, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Pokemon } from '../../../domain/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  imports: [NgOptimizedImage],
  styles: [`
    .fallback-placeholder {
      background-color: #e5e7eb;
      min-height: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .fallback-placeholder::after {
      content: '⚪';
      font-size: 2rem;
      position: absolute;
    }
  `]
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
  imageError = signal(false);

  onImageError() {
    this.imageError.set(true);
  }
}

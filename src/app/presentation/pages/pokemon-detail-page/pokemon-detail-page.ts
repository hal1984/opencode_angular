import { Component, ChangeDetectionStrategy, inject, input, signal, effect, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PokemonDetailStore } from '../../../application/stores/pokemon-detail.store';

@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.html',
  imports: [RouterLink, NgOptimizedImage],
  styles: [`
    .fallback-placeholder {
      background-color: #e5e7eb;
      min-height: 200px;
      min-width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .fallback-placeholder::after {
      content: '⚪';
      font-size: 3rem;
      position: absolute;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailPage {
  readonly id = input.required<number, string>({ transform: Number });
  readonly store = inject(PokemonDetailStore);
  readonly imageError = signal(false);
  protected readonly Math = Math;

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (currentId && currentId > 0) {
        untracked(() => this.store.loadPokemonById(currentId));
      }
    });
  }

  onImageError() {
    this.imageError.set(true);
  }
}

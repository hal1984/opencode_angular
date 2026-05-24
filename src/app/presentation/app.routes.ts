import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokedex',
    loadComponent: () => import('./pages/pokedex-page/pokedex-page').then(m => m.PokedexPage)
  }
];

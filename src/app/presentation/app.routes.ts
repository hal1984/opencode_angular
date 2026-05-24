import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
  },
  {
    path: 'pokedex',
    loadComponent: () => import('./pages/pokedex-page/pokedex-page').then(m => m.PokedexPage)
  }
];

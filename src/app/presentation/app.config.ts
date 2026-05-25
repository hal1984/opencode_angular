import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { POKEMON_REPOSITORY } from '../domain/repositories/pokemon.repository';
import { PokeapiDataSource } from '../infrastructure/data-sources/pokeapi.datasource';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: IMAGE_LOADER, useValue: (config: ImageLoaderConfig) => config.src },
    { provide: POKEMON_REPOSITORY, useClass: PokeapiDataSource }
  ]
};

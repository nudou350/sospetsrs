import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HttpRequestInterceptor } from './core/interceptors/httpRequestInterceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
export const appConfig: ApplicationConfig = {
  providers: [   
    provideRouter(routes, inMemoryScrollingFeature), 
    provideClientHydration(), 
    provideHttpClient(withFetch(), withInterceptors([HttpRequestInterceptor, loadingInterceptor])),
    {provide: 'googleTagManagerId',  useValue: 'GTM-5JF5GXWW'}
  ]
};

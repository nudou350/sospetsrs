import { ApplicationConfig } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
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
  ]
};

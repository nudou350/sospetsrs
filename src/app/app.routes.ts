import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./components/request-reset-password/request-reset-password.component').then(m => m.RequestResetPasswordComponent)
  },
  {
    path: 'nova-senha',
    loadComponent: () => import('./components/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent)
  },
  {
    path: 'abrigo',
    loadComponent: () => import('./components/abrigo/abrigo.component').then(m => m.AbrigoComponent)
  }
];

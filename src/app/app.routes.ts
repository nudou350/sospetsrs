import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    title:'Arcanimal'
    
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    title:'Arcanimal | Login'
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./components/request-reset-password/request-reset-password.component').then(m => m.RequestResetPasswordComponent),
    title:'Arcanimal | Recuperar senha'
  },
  {
    path: 'nova-senha',
    loadComponent: () => import('./components/password-recovery/password-recovery.component').then(m => m.PasswordRecoveryComponent),
    title:'Arcanimal | Nova senha'
  },
  {
    path: 'doar',
    loadComponent: () => import('./components/donation/donation.component').then(m => m.DonationComponent),
    title:'Arcanimal | Doar'
  },
  {
    path: 'abrigos',
    loadComponent: () => import('./components/abrigo/abrigo.component').then(m => m.AbrigoComponent),
    title:'Arcanimal | Abrigos'
  },
  {
    path: 'cadastrar-abrigo',
    loadComponent: () => import('./components/abrigo/components/create-shelter/create-shelter.component').then(m => m.CreateShelterComponent),
    canActivate: [authGuard],
    title:'Arcanimal | Cadastrar abrigo'
  },
  {
    path: 'editar-abrigo/:id',
    loadComponent: () => import('./components/abrigo/components/edit-shelter/edit-shelter.component').then(m => m.EditShelterComponent),
    title:'Arcanimal | Abrigo'
  },
  {
    path: 'procurar-animal',
    loadComponent: () => import('./components/procurar-animal/procurar-animal.component').then(m => m.ProcurarAnimalComponent),
    title:'Arcanimal | Procurar animal'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

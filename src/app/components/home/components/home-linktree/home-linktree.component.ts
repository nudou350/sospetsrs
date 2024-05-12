import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-linktree',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home-linktree.component.html',
  styleUrl: './home-linktree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLinktreeComponent {
  actions = [
    {
      text: "Solicitar resgate",
      icon: 'rescue',
      url: '/abrigos'
    },
    {
      text: "Visualizar abrigos",
      icon: 'shelter',
      url: 'https://www.petsos.com.br/'
    },
    {
      text: "Quero ser um lar temporário",
      icon: 'temporary-home',
      url: 'https://www.petsos.com.br/cadastro'
    },
    {
      text: "Quero adotar",
      icon: 'paw',
      url: 'https://www.petsos.com.br/cadastro'
    },
    {
      text: "Cadastrar animal encontrado",
      icon: 'search',
      url: 'https://www.petsos.com.br/'
    },
    {
      text: "Quero doar",
      icon: 'donation',
      url: '/'
    },

  ]
 }

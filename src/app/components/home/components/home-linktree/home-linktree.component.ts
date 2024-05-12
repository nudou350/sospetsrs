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
      text: "Situação atual dos abrigos",
      icon: 'shelter',
      url: '/abrigos'
    },
    {
      text: "Cadastre um animal perdido",
      icon: 'lost-pet',
      url: 'https://www.petsos.com.br/'
    },
    {
      text: "Cadastre um animal encontrado",
      icon: 'found',
      url: 'https://www.petsos.com.br/cadastro'
    },
    {
      text: "Peça um resgate",
      icon: 'sos',
      url: 'https://www.petsos.com.br/cadastro'
    },
    {
      text: "Veja os animais encontrados",
      icon: 'search',
      url: 'https://www.petsos.com.br/'
    },
    {
      text: "Quero adotar",
      icon: 'temporary-home',
      url: '/'
    },

  ]
 }

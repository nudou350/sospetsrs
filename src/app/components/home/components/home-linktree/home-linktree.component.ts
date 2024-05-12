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
      text: "Ver abrigos cadastrados",
      icon: 'shelter',
      url: '/abrigos'
    },
    {
      text: "Ver mural de animais encontrados",
      icon: 'search',
      url: 'https://www.petsos.com.br/'
    },
    {
      text: "Cadastrar animal perdido",
      icon: 'lost-pet',
      url: 'https://www.petsos.com.br/cadastro'
    },
    {
      text: "Cadastrar animal encontrado",
      icon: 'found',
      url: 'https://www.petsos.com.br/cadastro'
    },
    {
      text: "Solicitar resgate",
      icon: 'sos',
      url: '/'
    },
    {
      text: "Quero ser um lar temporário",
      icon: 'temporary-home',
      url: '/'
    },

  ]
 }

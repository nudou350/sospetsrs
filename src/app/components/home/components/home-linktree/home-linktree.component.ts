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
      url: 'https://forms.gle/c77RYoqRWLXVti1QA',
      isExternal: true
    },
    {
      text: "Informações dos abrigos",
      icon: 'shelter',
      url: '/abrigos',
      isExternal: false
    },
    {
      text: "Quero ser um lar temporário",
      icon: 'temporary-home',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSfNdBvHXW6_LrtrLFTZo9ZtSA7X-CGf1jl2pIAB_c9_B5Qwtw/viewform',
      isExternal: true
    },
    {
      text: "Quero adotar",
      icon: 'paw',
      url: 'https://forms.gle/Hi24HJmhNvkxNxkc9',
      isExternal: true
    },
    {
      text: "Procurar animal",
      icon: 'search',
      url: '/procurar-animal',
      isExternal: false
    },
    {
      text: "Quero doar",
      icon: 'donation',
      url: '/doar',
      isExternal: false
    },

  ]
 }

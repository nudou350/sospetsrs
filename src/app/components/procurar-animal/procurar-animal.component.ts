import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-procurar-animal',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPaginationModule],
  templateUrl: './procurar-animal.component.html',
  styleUrl: './procurar-animal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProcurarAnimalComponent {
  actions = [
    {
      text: "Pets RS",
      imgUrl: 'petsrs.png',
      url: 'https://petsrs.com.br/',
      isExternal: true
    },
    {
      text: "Encontre seu Pet - Canoas RS",
      imgUrl: 'encontreseupetrs.png',
      url: 'https://www.encontreseupetcanoas.com/',
      isExternal: true
    },
    {
      text: "PetMapa",
      imgUrl: 'petmapa.png',
      url: 'https://petmapa.com.br/',
      isExternal: true
    },
    {
      text: "AjudeRS",
      imgUrl: 'ajuders.png',
      url: 'https://app.ajuders.com.br/',
      isExternal: true
    },
    {
      text: "Pet SOS",
      imgUrl: 'petsos.png',
      url: 'https://www.petsos.com.br/',
      isExternal: true
    },
  ]
}

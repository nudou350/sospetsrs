import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IShelterInterface } from '../../dto/shelter.dto';

@Component({
  selector: 'app-abrigo-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './abrigo-card.component.html',
  styleUrl: './abrigo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoCardComponent {
  shelter = input<IShelterInterface>()

  formatPhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
 }

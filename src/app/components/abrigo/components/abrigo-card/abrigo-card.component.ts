import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { IShelterInterface } from '../../dto/shelter.dto';
import { RouterLink } from '@angular/router';

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
  @Input() shelter!: IShelterInterface;

  formatPhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
 }

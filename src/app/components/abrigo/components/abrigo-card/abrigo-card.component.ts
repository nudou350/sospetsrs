import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IShelterInterface } from '../../dto/shelter.dto';

@Component({
  selector: 'app-abrigo-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './abrigo-card.component.html',
  styleUrl: './abrigo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoCardComponent {
  shelter = input<IShelterInterface>()
 }

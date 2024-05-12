import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class AbrigoCardComponent { }

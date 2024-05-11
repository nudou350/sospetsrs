import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-pet-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home-pet-card.component.html',
  styleUrl: './home-pet-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePetCardComponent { }

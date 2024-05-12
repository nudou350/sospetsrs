import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-abrigo-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './abrigo-button.component.html',
  styleUrl: './abrigo-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoButtonComponent { }
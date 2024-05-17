import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-in-development',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home-in-development.component.html',
  styleUrl: './home-in-development.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeInDevelopmentComponent {
    feedbackFormUrl =  "https://forms.gle/2xjhZ8LMCNic9b4MA"
 }

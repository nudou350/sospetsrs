import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-bottom-banner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home-bottom-banner.component.html',
  styleUrl: './home-bottom-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBottomBannerComponent { }

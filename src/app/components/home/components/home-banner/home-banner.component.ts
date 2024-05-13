import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeBannerComponent {
  rescueMapUrl = "https://earth.google.com/earth/d/1puzq1GWwlCdW_ulmV2pv47bHGqD7AUyx?usp=sharing"
}

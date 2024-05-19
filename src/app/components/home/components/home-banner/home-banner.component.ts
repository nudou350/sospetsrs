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
  rescueMapUrl = "https://www.google.com/maps/d/u/3/edit?mid=1kjb746-UAeM6jELlcQ6g2o7MDHKVj4o&usp=sharing"
}

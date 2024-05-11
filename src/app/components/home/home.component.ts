import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }

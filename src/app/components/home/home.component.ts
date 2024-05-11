import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeFiltersComponent } from './components/home-filters/home-filters.component';
import { HomePetCardComponent } from './components/home-pet-card/home-pet-card.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeBottomBannerComponent } from './components/home-bottom-banner/home-bottom-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeBannerComponent,
    HomeFiltersComponent,
    HomePetCardComponent,
    NgbPaginationModule,
    HomeBottomBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  page=1
 }

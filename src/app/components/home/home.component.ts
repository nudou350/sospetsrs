import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HomeLinktreeComponent } from './components/home-linktree/home-linktree.component';
import { HomeInDevelopmentComponent } from './components/home-in-development/home-in-development.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HomeBannerComponent,
    HomeLinktreeComponent,
    HomeInDevelopmentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  page=1
 }

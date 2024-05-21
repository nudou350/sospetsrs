import { Component, TemplateRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { LoadingService } from './core/services/loading.service';

import { ToastComponent } from './shared/toast/toast.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Projeto Arcanimal';
  loading = inject(LoadingService).loading
  #gtm = inject(GoogleTagManagerService)
  #router = inject(Router)
  constructor(){
    this.#router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
          const gtmTag = {
              event: 'page',
              pageName: item.url
          };

          this.#gtm.pushTag(gtmTag);
      }
  });
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NavbarComponent {
  router = inject(Router);
  #authService = inject(AuthService)
  loggedIn = this.#authService.loggedIn
  isMenuCollapsed = true;
  #toastService = inject(ToastService)

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  logout(){
    this.#toastService.showSuccess("Logout bem sucedido! Até logo")
    this.#authService.logout()
  }

}

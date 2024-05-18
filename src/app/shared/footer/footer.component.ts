import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  #authService = inject(AuthService)
  currentYear: number = new Date().getFullYear()

  loggedIn = this.#authService.loggedIn

  #toastService = inject(ToastService)

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;

  logout(){
    this.#toastService.showSuccess("Logout bem sucedido! Até logo.", 3000);

    this.#authService.logout()
  }
}

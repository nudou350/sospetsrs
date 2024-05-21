import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { PasswordInputComponent } from '../../../../shared/password-input/password-input.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    PasswordInputComponent,
  ],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  #toastService = inject(ToastService);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.#toastService.showSuccess('Login bem sucedido!', 3000); 
        },
        error: (error) => {
          this.#toastService.showError('Erro ao logar! Verifique seu email ou senha', 3000);
        },
      });
    }
  }

  onRequestResetPassword() {
    //TODO: Melhorar fluxo, adicionar input de email na tela de recuperação talvez
    if (!this.loginForm.get('email')?.valid) {
      alert('Necessário preencher o e-mail para recuperar a senha!');
      return;
    }

    this.authService
      .requestResetPassword({ email: this.loginForm.value['email'] })
      .subscribe({
        next: (response) => {
        },
        error: (error) => {
        },
      });
  }
}

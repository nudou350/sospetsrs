import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class LoginFormComponent {
  loginForm: FormGroup;
  #toastService = inject(ToastService);
  hidePassword: boolean = true;

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;

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
          this.#toastService.showSuccess('Login bem sucedido!');
          console.log('Login successful', response);
        },
        error: (error) => {
          this.#toastService.showError(
            'Erro ao logar! Verifique seu email ou senha'
          );
          console.error('Login failed', error);
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get showWarnningRulePass() {
    return (
      this.loginForm.get('password')?.errors?.['required'] &&
      this.loginForm.get('password')?.touched
    );
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
          console.log('Request reset password successful', response);
        },
        error: (error) => {
          console.error('Request failed', error);
        },
      });
  }
}

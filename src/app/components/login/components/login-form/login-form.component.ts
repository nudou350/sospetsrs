import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }

  onRequestResetPassword() {
    //TODO: Melhorar fluxo, adicionar input de email na tela de recuperação talvez
    if (!this.loginForm.get('email')?.valid) {
      alert("Necessário preencher o e-mail para recuperar a senha!");
      return;
    }

    this.authService.requestResetPassword({ email: this.loginForm.value['email'] }).subscribe({
      next: (response) => {
        console.log('Request reset password successful', response);
      },
      error: (error) => {
        console.error('Request failed', error);
      }
    });
  }
}

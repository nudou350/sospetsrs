import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';


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
  toastService = inject(ToastService)

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;


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
          this.toastService.show({ template: this.successTpl, classname:"text-white bg-success p-2" });
          console.log('Login successful', response);
        },
        error: (error) => {
          this.toastService.show({ template: this.errorTpl, classname:"text-white bg-danger p-2" });
          console.error('Login failed', error);
        }
      });
    }
  }
}

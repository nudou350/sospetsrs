import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  @Input() messageRulePass = 'O campo senha é obrigatório';

  @Input()
  loginForm!: FormGroup;
  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get showWarnningRulePass() {
    return (
      this.loginForm.get('password')?.errors?.['required'] &&
      this.loginForm.get('password')?.touched
    );
  }
}

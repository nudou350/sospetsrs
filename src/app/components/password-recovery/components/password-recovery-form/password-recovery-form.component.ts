import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class PasswordRecoveryFormComponent {
  password: string = '';
  confirmPassword: string = '';

  constructor() {}

  onRecovery(form: NgForm) {
    if (form.valid) {
      console.log('Password recovery data:', form.value);
    }
  }
}

import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  onLogin(form: NgForm) {
    if (form.valid) {
      console.log('Login data:', form.value);
    }
  }
}

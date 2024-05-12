import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    LoginFormComponent,
  ]
})
export class LoginComponent {
}

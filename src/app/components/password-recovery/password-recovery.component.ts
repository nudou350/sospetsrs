import { Component } from '@angular/core';
import { PasswordRecoveryFormComponent } from './components/password-recovery-form/password-recovery-form.component';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
  standalone: true,
  imports: [
    PasswordRecoveryFormComponent
  ]
})
export class PasswordRecoveryComponent {
}

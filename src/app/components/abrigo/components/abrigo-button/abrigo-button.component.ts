import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-abrigo-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './abrigo-button.component.html',
  styleUrl: './abrigo-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoButtonComponent { 
  user = inject(AuthService).user
  canEdit = computed(()=> this.user().role == 'admin' || this.user().role == 'volunteer')
}
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IShelterInterface } from '../../dto/shelter.dto';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-abrigo-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './abrigo-card.component.html',
  styleUrl: './abrigo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoCardComponent {
  shelter = input<IShelterInterface>()
  user = inject(AuthService).user
  canEdit = computed(()=> this.user().role == 'admin' || this.user().role == 'volunteer')

  formatPhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
 }

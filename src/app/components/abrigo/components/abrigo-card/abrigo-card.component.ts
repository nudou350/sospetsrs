import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IShelterInterface } from '../../dto/shelter.dto';
import { AuthService } from '../../../../core/services/auth.service';
import { ShelterService } from '../../../../core/services/shelter.service';
import { ToastService } from '../../../../core/services/toast.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-abrigo-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbTooltip
  ],
  templateUrl: './abrigo-card.component.html',
  styleUrl: './abrigo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoCardComponent {
  #shelterService = inject(ShelterService)
  @Output() deleteShelter: EventEmitter<number> = new EventEmitter()
  shelter = input<IShelterInterface>()
  limit = signal(2)
  #router = inject(Router)
  user = inject(AuthService).user
  canEdit = computed(()=> this.user().role == 'admin' || this.user().role == 'volunteer')

  formatPhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
  navigateToShelter(id:number){
    this.#router.navigate(['abrigo', id])
  }

  changeLimit(){
    const newLimit = this.limit() === 2 ? this.shelter()!.needs.length : 2
    this.limit.set(newLimit)
  }

  capacityExists(capacity: number | null){
    if(capacity === null) return false
    return typeof capacity === 'number'
  }


 }

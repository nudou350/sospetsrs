import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  afterNextRender,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CapitalPipe } from '../../../../core/pipes/capital.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { ShelterService } from '../../../../core/services/shelter.service';
import { IShelterInterface } from '../../dto/shelter.dto';

@Component({
  selector: 'app-abrigo-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbTooltip, CapitalPipe],
  templateUrl: './abrigo-card.component.html',
  styleUrl: './abrigo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoCardComponent{
  #shelterService = inject(ShelterService);
  #authService = inject(AuthService);
  @Input() shelter!: IShelterInterface;
  @Output() deleteShelter = new EventEmitter<number>();
  canEdit = this.#authService.canEdit;
  needs = 4
constructor(){
  afterNextRender(()=> {
    if(window.innerWidth <= 768){
      this.needs = 3
    }
  })
}

  updateNeedsAmount(){
    if(this.needs <=4){
      this.needs = this.shelter.needs.length
    }
    else{
      window.innerWidth <= 768 ? this.needs = 3 : this.needs = 4
    }
  }

  formatPhone(phone: string) {
    return '+55' + phone.replace(/\D/g, '');
  }
}

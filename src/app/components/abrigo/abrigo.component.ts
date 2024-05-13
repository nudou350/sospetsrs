import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbrigoButtonComponent } from './components/abrigo-button/abrigo-button.component';
import { AbrigoCardComponent } from './components/abrigo-card/abrigo-card.component';
import { AbrigoFiltersComponent } from './components/abrigo-filters/abrigo-filters.component';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShelterService } from '../../core/services/shelter.service';

@Component({
  selector: 'app-abrigo',
  templateUrl: './abrigo.component.html',
  styleUrls: ['./abrigo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    AbrigoButtonComponent,
    AbrigoCardComponent,
    AbrigoFiltersComponent,
    NgbPaginationModule
  ]
})
export class AbrigoComponent {
  page = 1
  pageSize = 6
  #shelterService = inject(ShelterService)
  shelters = this.#shelterService.shelters
  scrollTop() {
    const element = document.getElementById('topView');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
}


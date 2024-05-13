import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbrigoButtonComponent } from './components/abrigo-button/abrigo-button.component';
import { AbrigoCardComponent } from './components/abrigo-card/abrigo-card.component';
import { AbrigoFiltersComponent } from './components/abrigo-filters/abrigo-filters.component';
import { ShelterService } from '../../services/shelter.service';
import { CommonModule } from '@angular/common';

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
    AbrigoFiltersComponent
  ]
})
export class AbrigoComponent {
  #shelterService = inject(ShelterService)
  shelters$ = this.#shelterService.getShelters()
}


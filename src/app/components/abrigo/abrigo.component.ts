import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { AbrigoButtonComponent } from './components/abrigo-button/abrigo-button.component';
import { AbrigoCardComponent } from './components/abrigo-card/abrigo-card.component';
import { AbrigoFiltersComponent } from './components/abrigo-filters/abrigo-filters.component';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShelterService } from '../../core/services/shelter.service';
import { ToastService } from '../../core/services/toast.service';

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
    NgbPaginationModule,
  ],
})
export class AbrigoComponent {
  @ViewChild('deleteTpl') deleteTpl!: TemplateRef<any>;
  page = 1;
  pageSize = 6;
  #shelterService = inject(ShelterService);
  #cdr = inject(ChangeDetectorRef);
  toastService = inject(ToastService);

  shelters = this.#shelterService.shelters;

  location = signal<string>('');
  occupation = signal<string>('');

  changeLocation = (location: string) => {
    this.location.set(location);
  };

  changeOccupation = (occupation: string) => {
    this.occupation.set(occupation);
  };
  filteredShelters = computed(() => {
    const location = this.location();
    const occupation = this.occupation();
    return this.#shelterService
      .shelters()
      .filter((shelter) => {
        return location === '' || shelter.location === location;
      })
      .filter((shelter) => {
        return occupation === '' || shelter.capacity - shelter.occupation > 0;
      });
  });

  scrollTop() {
    const element = document.getElementById('topView');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  deleteShelter(id: number) {
    confirm('Tem certeza que deseja deletar o abrigo?') &&
      this.#shelterService.deleteShelter(id).subscribe({
        next: () => {
          this.toastService.show({
            template: this.deleteTpl,
            classname: 'text-white bg-success p-2',
          });
          this.#cdr.markForCheck();
        },
      });
  }
}

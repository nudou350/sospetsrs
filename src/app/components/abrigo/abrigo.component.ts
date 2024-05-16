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
import { IShelterInterface } from './dto/shelter.dto';
import { RSCitiesDto } from '../../shared/dtos/cities.dto';

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

  cities = RSCitiesDto
  shelters = this.#shelterService.shelters;
  capacity = signal<string>('Todos')
  searchFilter = signal<IShelterInterface[]>(this.shelters())

  filteredShelters = computed(()=> {
   return this.capacity() === 'Todos' ? this.searchFilter() : 
   this.searchFilter().filter((shelter: IShelterInterface) => shelter.capacity > shelter.occupation)  

  })
  
  scrollTop() {
    const element = document.getElementById('topView');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  updateSearchFilter(event:any){
    this.searchFilter.set(event)
  }
  updateCapacityFilter(event:any){
    this.capacity.set(event)
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

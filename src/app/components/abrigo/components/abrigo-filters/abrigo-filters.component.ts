import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbDropdownModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { ShelterService } from '../../../../core/services/shelter.service';
import { IShelterInterface } from '../../dto/shelter.dto';
import { RSCitiesDto } from '../../../../shared/dtos/cities.dto';

@Component({
  selector: 'app-abrigo-filters',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbTypeaheadModule, FormsModule],
  templateUrl: './abrigo-filters.component.html',
  styleUrl: './abrigo-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoFiltersComponent implements OnInit {
  #shelterService = inject(ShelterService);
  #router = inject(Router);
  model!: any;
  @Input() shelters!: IShelterInterface[];
  shelterState = this.#shelterService.shelters;
  shelterNames: string[] = [];
  capacity = 'Vagas'
  @Output() searchFilter = new EventEmitter<IShelterInterface[]>();
  @Output() capacityFilter = new EventEmitter();
  cities = RSCitiesDto

  ngOnInit(): void {
    this.shelterNames = this.shelters.map((shelter) => shelter.name);
  }



  private static removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((term) => {
        const sanitizedTerm = AbrigoFiltersComponent.removeAccents(term).toLowerCase();
        if(sanitizedTerm.length < 2) {
          this.searchFilter.emit(this.shelters)
          return []
        }
        //check shelter names and cities
        else{
          const filteredResult: IShelterInterface[] = []
          const returnQuery: string[]= []
          this.shelters.forEach((shelter) => {
            if(AbrigoFiltersComponent.removeAccents(shelter.name).toLowerCase().includes(sanitizedTerm) || AbrigoFiltersComponent.removeAccents(shelter.location).toLowerCase().includes(sanitizedTerm)){
              filteredResult.push(shelter);
              if(AbrigoFiltersComponent.removeAccents(shelter.location).toLowerCase().includes(sanitizedTerm)){
                returnQuery.includes(AbrigoFiltersComponent.removeAccents(shelter.location)) ? null : returnQuery.push(shelter.location)
              }
            }
          });
         this.searchFilter.emit(filteredResult)
          return []
        }
      })
    );
}

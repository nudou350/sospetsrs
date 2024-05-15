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
  @Output() filteredShelters = new EventEmitter<any[]>();
  selectedLocation: string = 'Todos';
  selectedOccupation: string = 'Todos';
  locations: string[] = [];
  occupation: string = 'Todos';

  @Input() onChangeLocation!: (location: string) => void;
  @Input() onChangeOccupation!: (occupation: string) => void;

  ngOnInit(): void {
    this.shelterNames = this.shelters.map((shelter) => shelter.name);
  }
  ngOnChanges(): void {
    this.locations = this.getUniqueLocations(this.shelters);
  }

  filterByLocation(location: string) {
    this.selectedLocation = location;

    location !== 'Todos'
      ? this.onChangeLocation(location)
      : this.onChangeLocation('');
  }

  filterByOccupation(occupation: string) {
    this.occupation = occupation;
    this.selectedOccupation = occupation;

    occupation !== 'Todos'
      ? this.onChangeOccupation(occupation)
      : this.onChangeOccupation('');
  }

  private getUniqueLocations(shelters: IShelterInterface[]): string[] {
    const uniqueLocations = new Set<string>();
    shelters.forEach((shelter) => {
      uniqueLocations.add(shelter.location);
    });
    return Array.from(uniqueLocations);
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.shelterNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  navigateToShelter(event: any) {
    const selectedShelter = this.shelters.find(
      (shelter) => shelter.name === event.item
    );
    if (selectedShelter) {
      this.#router.navigate([`/editar-abrigo/${selectedShelter.id}`]);
    }
  }
}

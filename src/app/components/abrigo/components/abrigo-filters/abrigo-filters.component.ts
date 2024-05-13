import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { IShelterInterface } from '../../dto/shelter.dto';
import { ShelterService } from '../../../../core/services/shelter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abrigo-filters',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    FormsModule
  ],
  templateUrl: './abrigo-filters.component.html',
  styleUrl: './abrigo-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoFiltersComponent implements AfterViewInit{
  #shelterService =inject(ShelterService)
  #router = inject(Router)
  model!: any;
  @Input() shelters!: IShelterInterface[]
  shelterState = this.#shelterService.shelters
  shelterNames: string[] = []
  ngAfterViewInit(): void {
    this.shelterNames = this.shelters.map(shelter => shelter.name);
  }

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : this.shelterNames.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);

    navigateToShelter(event:any) {
      const selectedShelter = this.shelters.find(shelter => shelter.name === event.item);
      if (selectedShelter) {
        this.#router.navigate([`/editar-abrigo/${selectedShelter.id}`]);
      }

    }
 }
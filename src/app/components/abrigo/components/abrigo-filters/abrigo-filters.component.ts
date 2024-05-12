import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-abrigo-filters',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  templateUrl: './abrigo-filters.component.html',
  styleUrl: './abrigo-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbrigoFiltersComponent { }
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-filters',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  templateUrl: './home-filters.component.html',
  styleUrl: './home-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFiltersComponent { }

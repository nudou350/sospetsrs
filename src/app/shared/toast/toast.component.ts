import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../core/services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [NgbTooltipModule, NgbToastModule],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
	host: { 
		class: 'toast-container position-fixed top-0 end-0 p-3 text-white', 
	},
})
export class ToastComponent  {
	toastService = inject(ToastService);
}

import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
	header: string; 
	classname: string; 
	delay?: number;
  }
  
  @Injectable({
	providedIn: 'root'
  })
  export class ToastService {
	toasts: ToastInfo[] = []; 
  
	showSuccess(header: string, delay?: number){
		this.toasts.push({ header, classname: "rounded bg-success p-3", delay });
	}
	  
	showError(header: string, delay?: number){
		this.toasts.push({ header, classname : "rounded bg-danger p-3", delay });
	}

	show(header: string, classname:string, delay?: number){
		this.toasts.push({ header, classname, delay });
	}
  
	remove(toast: ToastInfo){
		this.toasts = this.toasts.filter(t => t != toast);
	}
  }
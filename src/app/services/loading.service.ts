import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  #loading = signal(false);
  loading= this.#loading.asReadonly()
  loadingCount = 0

  show() {
    this.loadingCount++
    this.#loading.set(true);
  }
  hide(){
    this.loadingCount--
    if(this.loadingCount <= 0)
    this.#loading.set(false);
  }

}

import { Injectable, inject } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  #http = inject(HttpService)

  getShelters(){
    return this.#http.get(`${environment.apiUrl}/shelters`)
  }
}

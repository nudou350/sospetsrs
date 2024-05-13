import { Injectable, inject } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { environment } from '../../environments/environment';
import { IShelterInterface } from '../components/abrigo/dto/shelter.dto';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  #http = inject(HttpService)

  getShelters(): Observable<IShelterInterface[]>{
    return this.#http.get<{data: IShelterInterface[]}>(`${environment.apiUrl}/shelters`).pipe(
      map(res => res.data))
  }
}

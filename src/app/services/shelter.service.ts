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
      map(res => res.data));
  }

  getShelterById(id: number): Observable<IShelterInterface>{
    return this.#http.get<IShelterInterface>(`${environment.apiUrl}/shelters/${id}`).pipe(
      map(res => res));
  }

  updateShelter(id: number, shelter: IShelterInterface): Observable<IShelterInterface>{
    return this.#http.put<IShelterInterface>(`${environment.apiUrl}/shelters/${id}`, shelter).pipe(
      map(res => res));
  }
  createShelter(shelter: Partial<IShelterInterface>): Observable<IShelterInterface>{
    return this.#http.post<IShelterInterface>(`${environment.apiUrl}/shelters`, shelter).pipe(
      map(res => res));
  }
}
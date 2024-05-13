import { Injectable, inject, signal } from '@angular/core';

import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IShelterInterface } from '../../components/abrigo/dto/shelter.dto';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  #http = inject(HttpService)
  //create a signal to store the shelters so we dont have to keep calling API later
  #shelters = signal<IShelterInterface[]>([]);
  shelters = this.#shelters.asReadonly()

  getShelters(): Observable<IShelterInterface[]> {
    return this.#http.get<{ data: IShelterInterface[] }>(`${environment.apiUrl}/shelters`).pipe(
      map(res => res.data),
      tap(shelters => this.#shelters.set(shelters)))
  }

  getShelterById(id: number): Observable<IShelterInterface> {
    return this.#http.get<IShelterInterface>(`${environment.apiUrl}/shelters/${id}`).pipe(
      map(res => res));
  }

  updateShelter(id: number, shelter: IShelterInterface): Observable<IShelterInterface> {
    return this.#http.put<IShelterInterface>(`${environment.apiUrl}/shelters/${id}`, shelter).pipe(
      map(res => res));
  }

  createShelter(shelter: Partial<IShelterInterface>): Observable<IShelterInterface> {
    return this.#http.post<IShelterInterface>(`${environment.apiUrl}/shelters`, shelter).pipe(
      map(res => res));
  }
  deleteShelter(id: number) {
    return this.#http.delete(`${environment.apiUrl}/shelters/${id}`);
  }
}
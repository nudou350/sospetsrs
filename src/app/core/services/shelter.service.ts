import { Injectable, inject, signal } from '@angular/core';

import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IShelterInterface } from '../../components/abrigo/dto/shelter.dto';
import { HttpService } from '../http/http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  #http = inject(HttpService)
  //create a signal to store the shelters so we dont have to keep calling API later
  #shelters = signal<IShelterInterface[]>([]);
  shelters = this.#shelters.asReadonly()

  constructor(){
    this.getShelters().pipe(takeUntilDestroyed()).subscribe()
  }

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
    const shelterWithoutId = { ...shelter }
    delete shelterWithoutId.id
    return this.#http.put<IShelterInterface>(`${environment.apiUrl}/shelters/${id}`, shelterWithoutId).pipe(
      map(res => res),
    tap(()=> {
      const shelters = this.#shelters()
      const index = shelters.findIndex(s => s.id === id)
      shelters[index] = shelter
      this.#shelters.set(shelters)
    }))
  }

  createShelter(shelter: Partial<IShelterInterface>): Observable<IShelterInterface> {
    return this.#http.post<IShelterInterface>(`${environment.apiUrl}/shelters`, shelter).pipe(
      map(res => res));
  }
  deleteShelter(id: number) {
    return this.#http.delete(`${environment.apiUrl}/shelters/${id}`).pipe(
      tap(()=> {
        const shelters = this.#shelters()
        const index = shelters.findIndex(s => s.id === id)
        shelters.splice(index, 1)
        this.#shelters.set(shelters)
      })
    );
  }
}
import { Injectable, inject, signal } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { ILogin } from '../components/login/dtos/login.dto';
import { environment } from '../../environments/environment';
import { filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpService)
  #route = inject(Router)
  #loggedIn = signal(false)
  loggedIn = this.#loggedIn.asReadonly()

  login(body: ILogin){
    return this.#http.post<{access_token:string}>(`${environment.apiUrl}/auth/login`, body).pipe(
      tap((res)=> {
        this.#loggedIn.set(true)
        this.saveToStorage('accessToken', res.access_token)
        this.#route.navigateByUrl('/abrigos')
      })
    )
  }

  private getFromStorage(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  private saveToStorage(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeFromStorage(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

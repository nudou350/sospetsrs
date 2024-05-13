import { Injectable, afterNextRender, inject, signal } from '@angular/core';
import { filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ILogin } from '../../components/login/dtos/login.dto';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpService)
  #route = inject(Router)
  #loggedIn = signal(false)
  loggedIn = this.#loggedIn.asReadonly()

  constructor(){
    afterNextRender(()=> {
      if(typeof window !== 'undefined' && this.getFromStorage('accessToken') != null){
        this.#loggedIn.set(true)
      }
    })

  }

  login(body: ILogin){
    return this.#http.post<{access_token:string}>(`${environment.apiUrl}/auth/login`, body).pipe(
      tap((res)=> {
        this.#loggedIn.set(true)
        this.saveToStorage('accessToken', res.access_token)
        this.#route.navigateByUrl('/abrigos')
      })
    )
  }

  requestResetPassword(body: {email: string}){
    return this.#http.post<{access_token:string}>(`${environment.apiUrl}/users/reset-password`, body).pipe(
      tap((_)=> {
        this.#route.navigateByUrl('/recuperar-senha')
      })
    )
  }

  logout(){
    this.#loggedIn.set(false)
    this.removeFromStorage('accessToken')
    this.#route.navigateByUrl('/login')
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

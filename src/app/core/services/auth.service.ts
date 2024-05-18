import { Injectable, afterNextRender, computed, inject, signal } from '@angular/core';
import { filter, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ILogin } from '../../components/login/dtos/login.dto';
import { HttpService } from '../http/http.service';
import { IUser, IUsersRole } from './dto/user.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpService)
  #route = inject(Router)
  #loggedIn = signal(false)
  loggedIn = this.#loggedIn.asReadonly()
  #user = signal<IUser>({id: 0, name: '', email: '', role: '', phone: '', createdAt: '', updatedAt: '', updatedBy: 0})
  user = this.#user.asReadonly()
  canEdit = computed(()=> this.#user().role === 'admin' || this.#user().role === 'volunteer')

  constructor(){
    afterNextRender(()=> {
      //check if already rendered the view and finished the SSR rendering
      if(typeof window !== 'undefined' && this.getFromStorage('accessToken') != null){
        const email = this.getEmailFromToken(this.getFromStorage('accessToken') as string)
        const exp = this.getTokenExpiration(this.getFromStorage('accessToken') as string)
        //check if email and expire dates are valid in JWT
        if(!email || !exp) return this.logout()
        else{
        //get user roles by email to set user permissions
          this.#http.get<IUsersRole>(`${environment.apiUrl}/users/role`).subscribe((res)=> {
            const user = res.data.find((user)=> user.email == email)
            if(user == undefined) return this.logout()
            this.#loggedIn.set(true)
            this.#user.set(user)
          })
      }
      }
    })

  }

  getEmailFromToken(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
  
      return payload.email;
    } catch (err) {
      console.log('Invalid token', err);
      return null;
    }
  }
  getTokenExpiration(token:string){
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
  
      return payload.exp;
    } catch (err) {
      console.log('Invalid token', err);
      return null;
    }
  }
  getUserRoleWithoutLogin(){
    return this.#http.get<IUsersRole>(`${environment.apiUrl}/users/role`)
  }
  login(body: ILogin){
    return this.#http.post<IUser & {access_token:string}>(`${environment.apiUrl}/auth/login`, body).pipe(
      tap((res)=> {
        this.#loggedIn.set(true)
        this.saveToStorage('accessToken', res.access_token)
        this.#user.set(res)
        this.#route.navigateByUrl('/')
      })
    )
  }

  requestResetPassword(body: {email: string}){
    return this.#http.post<{access_token:string}>(`${environment.apiUrl}/users/reset-password?email=${body.email}`, body).pipe(
      tap((_)=> {
        this.#route.navigateByUrl('/recuperar-senha')
      })
    )
  }

  logout(){
    this.#loggedIn.set(false)
    this.removeFromStorage('accessToken')
    this.#route.navigateByUrl('/')
    this.#user.set({id: 0, name: '', email: '', role: '', phone: '', createdAt: '', updatedAt: '', updatedBy: 0})
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

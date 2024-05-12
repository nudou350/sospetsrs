import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../../../core/http/http.service';
import { User } from '../models/user.model';
import { LoginPayload } from '../dtos/login.dto';
import { environment } from '../../../../environments/environment';

type AuthState = {
    user: User | null;
    token: string | null;
    isAuth: boolean;
    loading: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _accessTokenKey = "accessToken";
  private _state: BehaviorSubject<AuthState>;

  private loginUrl = `${environment.apiUrl}/login`

  public readonly state$;

  // TODO: Verificar como usar signals
  constructor(private httpService: HttpService, private router: Router) {
    const token = this.getFromStorage(this._accessTokenKey);
    this._state = new BehaviorSubject<AuthState>({
      user: null,
      token: token,
      isAuth: !!token,
      loading: false,
    });
    this.state$ = this._state.asObservable();
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

  login(payload: LoginPayload) {
    this._state.next({ ...this._state.value, loading: true });
    return this.httpService.post<{ user: User, access_token: string }>(this.loginUrl, payload).pipe(
      map(res => {
        this.updateAuthState(res.data.user, res.data.access_token);
        this.router.navigate(["/abrigos"]);
        return res;
      }),
      catchError(err => {
        this._state.next({ ...this._state.value, loading: false });
        return throwError(() => new Error("Failed to login"));
      })
    );
  }

  private updateAuthState(user: User, token: string) {
    this._state.next({
      user: user,
      token: token,
      isAuth: true,
      loading: false
    });
    this.saveToStorage(this._accessTokenKey, token);
  }

  logout() {
    this.removeFromStorage(this._accessTokenKey);
    this._state.next({
      user: null,
      token: null,
      isAuth: false,
      loading: false
    });
    this.router.navigate(["/login"]);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.post<T>(url, data, options).pipe(
     // catchError(this.handleError)
    );
  }

  put<T>(url: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.put<T>(url, data, options).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }, params?: HttpParams | { [param: string]: string | string[] } }): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(url: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<T> {
    return this.http.patch<T>(url, data, options).pipe(
      catchError(this.handleError)
    );
  }

  // TODO: Tratar erros específicos como 401 direcionar para login
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.error.message || "Server error"));
  }
}

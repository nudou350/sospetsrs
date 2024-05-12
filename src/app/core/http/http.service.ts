import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(url, data, options).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(url: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(url, data, options).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[] }, params?: HttpParams | { [param: string]: string | string[] } }): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(url: string, data: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[] } }): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(url, data, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || "Server error"));
  }
}

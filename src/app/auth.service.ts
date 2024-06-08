import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  // return this.http.post<any[]>(`${this.apiUrl}/addproduct`, productData);
  loginAuth(val: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, val)
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
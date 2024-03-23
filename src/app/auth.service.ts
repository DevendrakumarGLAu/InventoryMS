import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    // Make an API call to authenticate user
    // Replace 'api/login' with your actual login endpoint
    return this.http.post<any>('api/login', { username, password }).pipe(
      map(response => {
        // If login successful, set logged-in status to true
        this.loggedIn = true;
        return true;
      }),
      catchError(error => {
        // Handle login error
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    // Clear user authentication status
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    // Check if the user is logged in
    return this.loggedIn;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`, 
      }),
    };
  }

  checkEmailAndUsername(email: string, username: string): Observable<any> {
    return this.http.post('/auth/check-duplicates', { email, username });
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<boolean>('http://localhost:8081/auth/validate', { headers });
  }

  makeAuthenticatedRequest() {
    return this.http.get('http://localhost:8081/reviews/create', this.getAuthHeaders());
  }

  register(fullName: string, email: string, username: string, password: string) {
    return this.http.post('http://localhost:8081/auth/register', {
      fullName,
      email,
      username,
      password
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        // Pass the backend error message
        return throwError(() => error.error.error || 'An unexpected error occurred.');
      })
    );
  }  
}

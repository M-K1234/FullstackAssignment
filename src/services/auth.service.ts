import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  
  register(fullName: string, email: string, username: string, password: string) {
    return this.http.post('http://localhost:8081/auth/register', {
      fullName,
      email,
      username,
      password
    });
  }
}

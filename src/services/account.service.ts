import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient) {}

    getAccountByEmail(email: string): Observable<Account> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    
        console.log('Calling getAccountByEmail...');
        return this.http.get<Account>(`http://localhost:8081/api/accounts/email/${email}`, { headers }).pipe(
          catchError((error) => {
              console.error('Error fetching account by email:', error);
              return throwError(() => error); // Rethrow error for handling
          })
        );
    }
    
    getAccount(): Observable<Account> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
      return this.http.get<Account>('http://localhost:8081/api/accounts/me', { headers });
    }
  

    updateAccount(id: number, account: Account): Observable<any> {
      console.log('Updating account details:', account);
      
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    
      return this.http.put<any>(`http://localhost:8081/api/accounts/update/${id}`, account, { headers }).pipe(
        catchError((error) => {
          console.error('Error updating account:', error);
          return throwError(() => error); // Rethrow error for handling
        }),
        tap((response) => {
          if (response.token) {
            // Update the JWT in localStorage with the new token from the response
            localStorage.setItem('token', response.token);
            console.log('Updated JWT stored in localStorage.');
          }
        })
      );
    }
    
        
}

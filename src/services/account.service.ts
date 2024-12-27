import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient) {}

    getAccount(id: number): Observable<Account> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        
        console.log('Calling getAccount...');
        return this.http.get<Account>(`http://localhost:8081/api/accounts/${id}`, { headers }).pipe(
            catchError((error) => {
              console.error('Error fetching account:', error);
              return throwError(() => error); // Rethrow error for handling
            })
          );
    }

    updateAccount(id: number, account: Account): Observable<Account> {
        return this.http.put<Account>(`/api/accounts/update/${id}`, account);
    }
        
}

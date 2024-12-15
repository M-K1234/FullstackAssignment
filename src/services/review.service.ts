// review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl+'/all');
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(this.apiUrl+'/'+id);
  }

  createReview(review: Review): Observable<Review> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if required
    });
  
    return this.http.post<Review>(`${this.apiUrl}/create`, review, { headers });
  }
  
}

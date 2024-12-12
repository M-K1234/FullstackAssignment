// review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Review>(this.apiUrl+'/create');
  }
}

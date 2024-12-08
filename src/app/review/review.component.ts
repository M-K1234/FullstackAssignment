import { Component, Injectable, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgFor],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

@Injectable({providedIn: 'root'})
export class ReviewComponent implements OnInit {

  reviews: Review[] = [];
  errorMessage: string = '';

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void 
  {
    this.loadReviews();
  }

  private loadReviews(): void 
  {
    this.reviewService.getReviews().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
      },
      error: (err) => {
        this.errorMessage = 'Error with reviews';
        console.error(err);
      },
    });
  }

}

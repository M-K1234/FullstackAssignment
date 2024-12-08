import { Component } from '@angular/core';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { NgFor } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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

import { Component, Injectable, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgFor, TruncatePipe, RouterLink],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})

@Injectable({providedIn: 'root'})
export class ReviewComponent implements OnInit {
  reviewId: string = '';
  review: Review  = 
  {
    id_review: 0,
    title: '',
    author: '',
    creation_date: new Date(),
    imgurl: '',
    text: '',
    score: 0
  };
  error: string = '';
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService, private router: ActivatedRoute) {}

  ngOnInit(): void 
  {

    const id = this.router.snapshot.paramMap.get('id');
    this.reviewId = id ? id : '1';

    this.loadReviewsById(this.reviewId);
    this.loadReviews();

    this.router.paramMap.subscribe((params) => {
      this.reviewId = params.get('id')!;
      this.loadReviewsById(this.reviewId);
    });
  }

  private loadReviews(): void 
  {
    this.reviewService.getReviews().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
      },
      error: (err) => {
        this.error = 'Error with reviews';
        console.error(err);
      },
    });
  }

  private loadReviewsById(id: string): void 
  {
    const idNum = Number(id);
    this.reviewService.getReviewById(idNum).subscribe({
      next: (data: Review) => {
        this.review = data;
      },
      error: (err) => {
        this.error = 'Error with news';
        console.error(err);
      },
    });
  }

}

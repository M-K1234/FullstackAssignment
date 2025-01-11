import { Component, EventEmitter, Output } from '@angular/core';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { NgFor } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { RouterLink } from '@angular/router';
import { DeezerComponent } from '../deezer/deezer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, TruncatePipe, RouterLink, DeezerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  news: News[] = [];
  reviews: Review[] = [];
  errorMessage: string = '';

  constructor(private reviewService: ReviewService, private newsService: NewsService) {}

  ngOnInit(): void 
  {
    
    this.loadReviews();
    this.loadNews();
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
 

  private loadNews(): void 
  {
    this.newsService.getNews().subscribe({
      next: (data: News[]) => {
        this.news = data;
      },
      error: (err) => {
        this.errorMessage = 'Error with news';
        console.error(err);
      },
    });
  }
}

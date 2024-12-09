import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { News } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { NgFor } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [TruncatePipe, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})

@Injectable({providedIn: 'root'})
export class NewsComponent {
  newsID: string = '';
  news: News  = {
    id_news: 0,
    title: '',
    author: '',
    creation_date: new Date(),
    imgurl: '',
    text: ''}
  allNews: News[] = [];
  errorMessage: string = '';

  constructor(private newsService: NewsService, private router: ActivatedRoute) {}

  ngOnInit(): void 
  {
      const id = this.router.snapshot.paramMap.get('id');
      this.newsID = id ? id : '1';
    
    
    this.loadNewsById(this.newsID);
    this.loadNews();

    this.router.paramMap.subscribe((params) => {
      this.newsID = params.get('id')!;
      this.loadNewsById(this.newsID);
    });
  }

  private loadNewsById(id: string | null): void 
  {
    const idNum = Number(id);
    this.newsService.getNewsEntry(idNum).subscribe({
      next: (data: News) => {
        this.news = data;
      },
      error: (err) => {
        this.errorMessage = 'Error with news';
        console.error(err);
      },
    });
  }
  private loadNews(): void 
  {
    this.newsService.getNews().subscribe({
      next: (data: News[]) => {
        this.allNews = data;
      },
      error: (err) => {
        this.errorMessage = 'Error with news';
        console.error(err);
      },
    });
  }

}

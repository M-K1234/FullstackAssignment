import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-review-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './review-add.component.html',
  styleUrl: './review-add.component.css'
})
export class ReviewAddComponent implements OnInit{

  @ViewChild(AccountComponent) child!: AccountComponent;

  reviewForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    score: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
    text: new FormControl('', [Validators.required]),
    imgurl: new FormControl(null), // Default to null
    creation_date: new FormControl(new Date())
  });  

  constructor(private reviewService: ReviewService, private route: Router) {}


  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review: Review = this.reviewForm.value;
      review.imgurl = ""; // Set imgurl to null
      this.save(review);
    } else {
      console.log('Form validation failed.');
    }
  }
  
  save(review: Review): void {
    this.reviewService.createReview(review).subscribe({
      next: (data) => {
        console.log('Review submitted successfully:', data);
        this.route.navigate(['/review']);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      },
    });
  }
  
}

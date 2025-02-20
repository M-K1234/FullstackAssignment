import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { catchError, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  // for testing
  timeoutId: any;

  constructor(private http: HttpClient, private router: Router) {}

  onsubmit() {
    // Clear previous messages
    this.successMessage = null;
    this.errorMessage = null;
  
    // Ensure email and password are entered
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      this.triggerErrorFadeOut(); // Trigger fade-out for error message
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
    this.errorMessage = 'Invalid email format.';
    this.triggerErrorFadeOut();
    return;
    }
  
    // Make login request
    this.http.post('http://localhost:8081/auth/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (data: any) => {
        // Store token and email in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
  
        // Display success message
        this.successMessage = 'Login successful! Redirecting to homepage...';
  
        // Clear success message after 2 seconds and redirect
        this.timeoutId = setTimeout(() => {
          this.successMessage = null; // Clear success message
          window.location.href = '/home'; // Redirect to homepage
        }, 2000);
      },
      error: (err) => {
        console.error(err);

        // Håndterer forskellige HTTP-fejlstatusser og viser passende fejlmeddelelser
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password.'; // Fejl ved forkerte loginoplysninger 
        } else if (err.status === 500) {
          this.errorMessage = 'An unexpected error occurred. Please try again later.'; // Serverfejl  
        } else {
          this.errorMessage = err.error?.error || 'Login failed. Please check your credentials.'; // Standard fejlmeddelelse 
        }
  
        // Display error message from backend or fallback
        //this.errorMessage = err.error?.error || 'Login failed. Please check your credentials.';
  
        // Trigger fade-out for error message
        this.triggerErrorFadeOut();
      },
    });
  }
  
  triggerErrorFadeOut() {
    setTimeout(() => {
      const errorElement = document.querySelector('.error-message');
      if (errorElement) {
        errorElement.classList.add('fade-out'); // Add fade-out class to trigger CSS animation
      }
  
      setTimeout(() => {
        this.errorMessage = null; // Clear the error message after fade-out
      }, 2000); // Wait for fade-out animation to complete
    }, 2000); // Show the error message for 2 seconds before fading out
  }  
}

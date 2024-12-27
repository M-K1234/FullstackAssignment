import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  fullName = '';
  email = '';
  username = '';
  password = '';
  repeatPassword = '';
  successMessage: string | null = null;
  emailError: string | null = null;
  usernameError: string | null = null;
  backendErrorMessage: string | null = null; // Add this property

  constructor(private router: Router, private authService: AuthService) {}

  validateFields() {
    if (this.email || this.username) {
      this.authService.checkEmailAndUsername(this.email, this.username)
        .pipe(debounceTime(300)) // Ensures a delay before making requests
        .subscribe((response: any) => {
          this.emailError = response.emailExists ? 'Email is already registered.' : null;
          this.usernameError = response.usernameExists ? 'Username is already taken.' : null;
        }, error => {
          console.error('Validation error', error);
        });
    }
  }
  

  submitForm() {
    if (this.password !== this.repeatPassword || this.emailError || this.usernameError) {
      return;
    }
  
    this.authService.register(this.fullName, this.email, this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login page...';
        this.backendErrorMessage = null; // Clear any previous errors
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error(err);
        // Display the exact backend error message
        this.backendErrorMessage = err || 'An error occurred during registration.';
        // Hide the message after 5 seconds
        setTimeout(() => {
          this.backendErrorMessage = null;
        }, 5000);
      }
    });
  }  
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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

  constructor(private router: Router, private authService: AuthService) {}

  submitForm() {
    if (this.password !== this.repeatPassword) {
      alert("Passwords don't match");
      return;
    }
    this.authService.register(this.fullName, this.email, this.username, this.password)
      .subscribe({
        next: res => {
          this.router.navigate(['/login']);
        },
        error: err => console.error('Error', err)
      });
    this.successMessage = 'Registration successful! Redirecting to login page...';
    setTimeout(() => {
      this.successMessage = null; // Clear the message
      window.location.href = '/login';
    }, 2000);
  }
}

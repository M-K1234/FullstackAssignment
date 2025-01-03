import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,  CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) 
  {
  }

  onsubmit(){
   this.http.post('http://localhost:8081/auth/login',{
      email: this.email,
      password: this.password
    }).subscribe({
      next: (data: any) => {
        
        localStorage.setItem('token', data.token); // Store the token
        localStorage.setItem('email', data.email); // Store the email
        console.log('Login successful! token: ' + localStorage.getItem('token'));
        this.successMessage = 'Login successful! Redirecting to homepage...';
  
        setTimeout(() => {
          
          this.successMessage = null; // Clear the message
          window.location.href = '/home';
        }, 2000);         
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
export var loginSuccess = false;

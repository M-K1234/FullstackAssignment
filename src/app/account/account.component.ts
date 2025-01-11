import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'] // <-- Note the plural 'styleUrls'
})
export class AccountComponent implements OnInit {
  id = 0;
  fullName = '';
  username = '';
  email = '';
  password = '';
  repeatPassword = '';
  reviewsCreated = 0;
  faPen = faPen;
  editMode = { fullName: false, username: false, email: false, password: false };
  emailError: string | null = null;
  usernameError: string | null = null;
  backendErrorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private accountService: AccountService,
    @Inject(AuthService) private authService: AuthService) {}

  ngOnInit() {
    this.loadAccount();
  }

  validateFields() {
    if (this.email || this.username) {
      this.authService.checkEmailAndUsername(this.email, this.username)
        .pipe(debounceTime(300))
        .subscribe((response: any) => {
          const isCurrentUserEmail = response.currentEmail === this.email;
          const isCurrentUserUsername = response.currentUsername === this.username;
  
          // Only show errors if the email/username is taken by another user
          this.emailError = response.emailExists && !isCurrentUserEmail ? 'Email is already registered.' : null;
          this.usernameError = response.usernameExists && !isCurrentUserUsername ? 'Username is already taken.' : null;
        }, error => {
          console.error('Validation error', error);
        });
    }
  }
  
  
  loadAccount() {
    this.accountService.getAccount().subscribe({
      next: (data) => {
        this.id = data.id;
        this.fullName = data.fullName;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.repeatPassword = data.password;
        this.reviewsCreated = data.reviewsCreated;
        // Optionally set editMode if needed
      },
      error: (err) => {
        console.error('Error fetching account:', err);
      },
    });
  }

  toggleEditMode(field: 'fullName' | 'username' | 'email' | 'password'): void {
    this.editMode[field] = !this.editMode[field];
  }

  saveChanges(): void {
    if (this.password !== this.repeatPassword) {
      return;
    }
  
    this.authService.checkEmailAndUsername(this.email, this.username)
      .pipe(debounceTime(300))
      .subscribe({
        next: (response: any) => {
          const isCurrentUserEmail = response.currentEmail === this.email;
          const isCurrentUserUsername = response.currentUsername === this.username;
  
          this.emailError = response.emailExists && !isCurrentUserEmail ? 'Email is already registered.' : null;
          this.usernameError = response.usernameExists && !isCurrentUserUsername ? 'Username is already taken.' : null;
  
          if (this.emailError || this.usernameError) {
            console.log('Validation failed. Please correct errors before submitting.');
            return;
          }
  
          const updatedAccount = {
            id: this.id,
            fullName: this.fullName,
            username: this.username,
            email: this.email,
            password: this.password,
            reviewsCreated: this.reviewsCreated
          };
  
          this.accountService.updateAccount(this.id, updatedAccount).subscribe({
            next: (response: any) => {
              console.log('Account updated successfully');
              this.backendErrorMessage = null;
              this.successMessage = 'Account updated successfully!';
              
              // Hide the success message after 3 seconds
              setTimeout(() => {
                this.successMessage = null;
              }, 3000);
              // Update JWT token if email changes
              if (response.token) {
                localStorage.setItem('token', response.token);
              }
  
              // Turn off edit modes
              this.editMode = {
                fullName: false,
                username: false,
                email: false,
                password: false
              };
            },
            error: (err) => {
              console.error('Error updating account:', err);
              this.backendErrorMessage = err?.error || 'Error updating account.';
              setTimeout(() => {
                this.backendErrorMessage = null;
              }, 3000);
            }
          });
        },
        error: (err) => {
          console.error('Validation error', err);
        }
      });
  }
    
  

  cancelEdit(): void {
    this.loadAccount(); // Reload original account data
    this.editMode = { 
      fullName: false, 
      username: false, 
      email: false, 
      password: false 
    };
  }
}

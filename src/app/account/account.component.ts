import { Component, OnInit} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  account: Account | null = null;
  faPen = faPen;
  editMode = { fullName: false, username: false, email: false, password: false };

  constructor(private accountService: AccountService) {}

  ngOnInit() {
      this.loadAccount();
  }

  loadAccount() {
    const accountId = 1; // Or make it dynamic
    this.accountService.getAccount(accountId).subscribe({
      next: (data) => {
        this.account = data; // Bind the fetched data to the component
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
    if (this.account) {
      this.accountService.updateAccount(this.account.id, this.account).subscribe({
        next: () => {
          console.log('Account updated successfully');
          this.editMode = { fullName: false, username: false, email: false, password: false };
        },
        error: (err) => {
          console.error('Error updating account:', err);
        }
      });
    }
  }

  cancelEdit(): void {
    this.loadAccount(); // Reload original account data
    this.editMode = { fullName: false, username: false, email: false, password: false };
  }
}

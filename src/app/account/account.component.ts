import { Component, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faBell } from '@fortawesome/free-solid-svg-icons';
import { ReviewAddComponent } from '../review-add/review-add.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  id_account = 1
  isLoggedIn = true;
  faPen = faPen;

}

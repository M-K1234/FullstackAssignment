import { Component, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  @Output() isLoggedIn = true;
  faPen = faPen;

}

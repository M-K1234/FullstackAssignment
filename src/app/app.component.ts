import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from "./home/home.component";
import { loginSuccess } from './login/login.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FontAwesomeModule, HomeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FullstackMandatory1';
  isLoggedIn: boolean = false;
  userEmail: string | null = '';
  userIcon = faUser;
  bellIcon = faBell;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userEmail = this.authService.getEmail();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }
}

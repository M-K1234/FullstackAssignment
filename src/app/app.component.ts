import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from "./home/home.component";
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FontAwesomeModule, HomeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Husk at rette styleUrl til styleUrls
})
export class AppComponent {
  title = 'FullstackMandatory1';
  isLoggedIn: boolean = false;
  userEmail: string | null = '';
  userIcon = faUser;
  bellIcon = faBell;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userEmail = this.authService.getEmail();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }

  goToAccount(): void {
    this.router.navigate(['/account']); // Naviger til kontosiden
  }
}
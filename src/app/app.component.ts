import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from "./home/home.component";
import { loginSuccess } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FontAwesomeModule, HomeComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FullstackMandatory1';
  isLoggedIn = loginSuccess;
  userIcon = faUser;
  bellIcon = faBell;
  
}

import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) 
  {

   
  }

  onsubmit(){
   this.http.post('http://localhost:8081/api/auth/login', {
      email: '',
      password: ''
    }).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
export var loginSuccess = false;

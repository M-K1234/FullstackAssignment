import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { routes } from '../app.routes';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { testingServices } from '../../test';
import { HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('login function', () => {

  let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({imports: [LoginComponent], providers: testingServices}).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  it('should give successmessage when returning token and email ', ()=> {
  
    component.email = 'w';
    component.password = 'w';
    let httpTesting = TestBed.inject(HttpTestingController);
    
    component.onsubmit();
    let request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush({token: 'token', email: 'ali@mail.dk'});

    expect(component.successMessage).toBe('Login successful! Redirecting to homepage...');
    clearTimeout(component.timeoutId);
  });

  it('should handle error if api returns error', ()=> {
    
    component.email = 'w';
    component.password = 'w';
    let httpTesting = TestBed.inject(HttpTestingController);
    
    component.onsubmit();
    let request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush(null, {status: 404, statusText: 'Error, no email found!'});

    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');

  });

  it('should give error message if email is empty', ()=> {
    
    component.email = '';
    component.password = 'w';
    
    component.onsubmit();

    expect(component.errorMessage).toBe('Email and password are required.');

  });

  it('should give error message if password is empty', ()=> {
    
    component.email = 'w';
    component.password = '';
    
    component.onsubmit();

    expect(component.errorMessage).toBe('Email and password are required.');

  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

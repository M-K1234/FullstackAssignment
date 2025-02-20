import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { testingServices } from '../../test';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';

describe('onsubmit method', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let httpTesting: HttpTestingController;
    let request: TestRequest;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [LoginComponent], providers: testingServices}).compileComponents();
      fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      
      // for mocking api response
      httpTesting = TestBed.inject(HttpTestingController);
      
      component.email = 'ali@mail.dk';
      component.password = 'aliali';
    });

    // check if statement for validation of email input
    it('should give error message when email is empty', () => {
       component.email = '';
      
      component.onsubmit();

      expect(component.errorMessage).toBe('Email and password are required.');
    });

    // check if statement for validation of email input
    it('should give error message when password is empty', () => {
      component.password = '';
     
     component.onsubmit();

     expect(component.errorMessage).toBe('Email and password are required.');
   });

  // check if succesMessage is set when api req succeeds
  it('should give successmessage when returning token and email ', ()=> {
    
    component.onsubmit();
    request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush({token: 'token', email: 'ali@mail.dk'});

    expect(component.successMessage).toBe('Login successful! Redirecting to homepage...');
    clearTimeout(component.timeoutId); // prevent page refresh, so jasmine doesn't disconnect
  });

  // check if error message is set when api req fails
  it('should handle error if api returns error', ()=> {
   
    component.onsubmit();
    request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush(null, {status: 404, statusText: 'Error, no email found!'});

    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');
  });

  // check if localstorage saves correctly
  it('should save token in local storage', () => {
    component.onsubmit();
    request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush({token: 'returnedToken', email: 'ali@mail.dk'});
    
    expect(localStorage.getItem('token')).toBe('returnedToken');
    clearTimeout(component.timeoutId); // prevent page refresh, so jasmine doesn't disconnect
  });

  // check if localstorage saves correctly
  it('should save email in local storage', () => {
    component.onsubmit();
    request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush({token: 'returnedToken', email: 'ali@mail.dk'});
    
    expect(localStorage.getItem('email')).toBe('ali@mail.dk');
    clearTimeout(component.timeoutId); // prevent page refresh, so jasmine doesn't disconnect
  });

  //If the email is not in a valid format (eg "test" without "@"), an error message should be displayed.
  it('should give error message when email format is invalid', () => {
    component.email = 'invalidEmail'; // Ugyldigt format
    component.password = 'password123';
   
    component.onsubmit();
   
    expect(component.errorMessage).toBe('Invalid email format.');
  });  

  //This ensures that a generic error message is displayed for server problems.
  it('should handle server errors gracefully', () => {
    component.onsubmit();
    request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(component.errorMessage).toBe('An unexpected error occurred. Please try again later.');
  });

  //This ensures that the correct error message is displayed in case of incorrect login.
  it('should show error message when credentials are incorrect', () => {
    component.onsubmit();
    request = httpTesting.expectOne('http://localhost:8081/auth/login');
    request.flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(component.errorMessage).toBe('Invalid email or password.');
  });

});



describe('triggerErrorFadeOut method', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [LoginComponent], providers: testingServices}).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.errorMessage = 'Error';
  });

  it('should add class called fade-out to submit button', () => {
    let errorElement;
    let classAdded;

    component.triggerErrorFadeOut();
    setTimeout(() => {
      fixture.detectChanges();
      errorElement = document.getElementById('submitMsg');
      classAdded = errorElement?.classList.contains('fade-out');
      
      expect(classAdded).toBe(true);
    }, 2001);
  });

  it('should set error message to null after 4 seconds', () => {
    component.errorMessage = 'Error'
    
    component.triggerErrorFadeOut();
    
    setTimeout(() => {
      expect(component.errorMessage).toBe(null);
    }, 4001);
  });
});

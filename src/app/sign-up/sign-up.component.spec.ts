import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { of } from 'rxjs';  // For mocking observable responses

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent, 
        RouterTestingModule, 
        HttpClientTestingModule // Add HttpClientTestingModule here
      ],
      providers: [
        AuthService,
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { queryParams: {} } } // Mock ActivatedRoute
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //Test for validateFields
  it('should set emailError and usernameError when email or username already exists', () => {
    // Spy on the AuthService to mock the checkEmailAndUsername method
    const authService = TestBed.inject(AuthService);
    const checkEmailAndUsernameSpy = spyOn(authService, 'checkEmailAndUsername').and.returnValue(of({ emailExists: true, usernameExists: false }));
  
    // Simulate filling out the email and username
    component.email = 'test@example.com';
    component.username = 'testuser';
  
    // Call the validateFields method
    component.validateFields();
  
    // Wait for the debounced request to complete
    fixture.detectChanges();
  
    // Assert that the emailError is set
    expect(component.emailError).toBe('Email is already registered.');
    expect(component.usernameError).toBeNull();
  });

  //Test for Invalid Form Submission
  it('should not call register method if passwords do not match', () => {
    // Spy on the AuthService to mock the register method
    const authService = TestBed.inject(AuthService);
    const registerSpy = spyOn(authService, 'register');
  
    // Set form data with mismatched passwords
    component.password = 'password123';
    component.repeatPassword = 'password456';
  
    // Call submitForm method
    component.submitForm();
  
    // Assert that register method was not called
    expect(registerSpy).not.toHaveBeenCalled();
  });

});

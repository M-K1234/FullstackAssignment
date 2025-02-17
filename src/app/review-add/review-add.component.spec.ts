import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewAddComponent } from './review-add.component';
import { testingServices } from '../../test';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Review } from '../../models/review.model';

describe('onSubmit', () => {
  let component: ReviewAddComponent;
  let fixture: ComponentFixture<ReviewAddComponent>;
  let httpTesting: HttpTestingController;
  let request: TestRequest;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAddComponent], providers: testingServices
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    // for mocking api response
    httpTesting = TestBed.inject(HttpTestingController);

  });
  // Test if reviewForm values can be stored in a Review object
  it('should be able to store reviewForm value in variable of type Review', ()=>{
      
    const reviewValue: Review = component.reviewForm.value;
    // Ensure the object contains expected properties
    expect(reviewValue).toEqual(jasmine.objectContaining({
      title: '',
      author: '',
      score: 1,
      text: '',
      imgurl: null,
      creation_date: jasmine.any(Date)
    }));
  });

  // Test if form submission is prevented when invalid
  it('should not call save() if form is invalid', () => {
    spyOn(component, 'save');
  
    // Set invalid form values
    component.reviewForm.patchValue({ title: '', author: '' });
  
    // Call onSubmit()
    component.onSubmit();
  
    // Ensure save() was never called
    expect(component.save).not.toHaveBeenCalled();
  });

    //  Test if form submission proceeds when valid
    it('should call save() if form is valid', () => {
      spyOn(component, 'save');
  
      // Set valid form values
      component.reviewForm.patchValue({
        title: 'Test Review',
        author: 'Test Author',
        score: 8,
        text: 'This is a test review.',
        imgurl: '',
        creation_date: new Date()
      });
  
      // Call onSubmit()
      component.onSubmit();
  
      // Ensure save() was called
      expect(component.save).toHaveBeenCalled();
    });
});
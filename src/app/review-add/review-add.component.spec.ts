// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReviewAddComponent } from './review-add.component';
// import { testingServices } from '../../test';
// import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
// import { Review } from '../../models/review.model';
//
// describe('onSubmit', () => {
//   let component: ReviewAddComponent;
//   let fixture: ComponentFixture<ReviewAddComponent>;
//   let httpTesting: HttpTestingController;
//   let request: TestRequest;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReviewAddComponent], providers: testingServices
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(ReviewAddComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//
//     // for mocking api response
//     httpTesting = TestBed.inject(HttpTestingController);
//
//   });
//
//   it('should be able to store reviewForm value in variable of type Review', ()=>{
//
//
//     expect( component.reviewForm.value).toBeInstanceOf(Review);
//   });
//
// });

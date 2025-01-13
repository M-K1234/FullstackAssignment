import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAddComponent } from './review-add.component';
import { testingServices } from '../../test';

describe('ReviewAddComponent', () => {
  let component: ReviewAddComponent;
  let fixture: ComponentFixture<ReviewAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewAddComponent], providers: testingServices
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeezerComponent } from './deezer.component';
import { testingServices } from '../../test';

describe('DeezerComponent', () => {
  let component: DeezerComponent;
  let fixture: ComponentFixture<DeezerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeezerComponent], providers: testingServices
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

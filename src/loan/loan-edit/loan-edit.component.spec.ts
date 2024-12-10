import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEditComponent } from './loan-edit.component';

describe('LoanEditComponent', () => {
  let component: LoanEditComponent;
  let fixture: ComponentFixture<LoanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

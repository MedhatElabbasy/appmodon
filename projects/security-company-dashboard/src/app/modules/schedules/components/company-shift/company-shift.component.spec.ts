import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShiftComponent } from './company-shift.component';

describe('CompanyShiftComponent', () => {
  let component: CompanyShiftComponent;
  let fixture: ComponentFixture<CompanyShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

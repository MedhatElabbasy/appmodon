import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShiftCardComponent } from './company-shift-card.component';

describe('CompanyShiftCardComponent', () => {
  let component: CompanyShiftCardComponent;
  let fixture: ComponentFixture<CompanyShiftCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyShiftCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyShiftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

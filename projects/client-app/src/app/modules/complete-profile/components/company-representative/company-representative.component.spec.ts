import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRepresentativeComponent } from './company-representative.component';

describe('CompanyRepresentativeComponent', () => {
  let component: CompanyRepresentativeComponent;
  let fixture: ComponentFixture<CompanyRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRepresentativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

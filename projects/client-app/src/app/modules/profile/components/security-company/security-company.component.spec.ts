import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCompanyComponent } from './security-company.component';

describe('SecurityCompanyComponent', () => {
  let component: SecurityCompanyComponent;
  let fixture: ComponentFixture<SecurityCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

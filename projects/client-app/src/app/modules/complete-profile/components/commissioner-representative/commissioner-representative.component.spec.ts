import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionerRepresentativeComponent } from './commissioner-representative.component';

describe('CommissionerRepresentativeComponent', () => {
  let component: CommissionerRepresentativeComponent;
  let fixture: ComponentFixture<CommissionerRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionerRepresentativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionerRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardLeavesComponent } from './guard-leaves.component';

describe('GuardLeavesComponent', () => {
  let component: GuardLeavesComponent;
  let fixture: ComponentFixture<GuardLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

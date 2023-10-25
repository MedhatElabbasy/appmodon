import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardCardComponent } from './guard-card.component';

describe('GuardCardComponent', () => {
  let component: GuardCardComponent;
  let fixture: ComponentFixture<GuardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

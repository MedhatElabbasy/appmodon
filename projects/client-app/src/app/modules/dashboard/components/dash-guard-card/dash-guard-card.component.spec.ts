import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGuardCardComponent } from './dash-guard-card.component';

describe('DashGuardCardComponent', () => {
  let component: DashGuardCardComponent;
  let fixture: ComponentFixture<DashGuardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashGuardCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashGuardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

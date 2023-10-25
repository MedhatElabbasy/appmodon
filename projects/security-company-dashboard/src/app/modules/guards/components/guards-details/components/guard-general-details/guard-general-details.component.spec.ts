import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardGeneralDetailsComponent } from './guard-general-details.component';

describe('GuardGeneralDetailsComponent', () => {
  let component: GuardGeneralDetailsComponent;
  let fixture: ComponentFixture<GuardGeneralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardGeneralDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

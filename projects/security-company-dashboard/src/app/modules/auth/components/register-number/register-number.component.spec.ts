import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNumberComponent } from './register-number.component';

describe('RegisterNumberComponent', () => {
  let component: RegisterNumberComponent;
  let fixture: ComponentFixture<RegisterNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

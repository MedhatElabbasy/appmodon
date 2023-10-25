import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthNavbarComponent } from './not-auth-navbar.component';

describe('NotAuthNavbarComponent', () => {
  let component: NotAuthNavbarComponent;
  let fixture: ComponentFixture<NotAuthNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

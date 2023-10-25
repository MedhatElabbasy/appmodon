import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderTitleComponent } from './border-title.component';

describe('BorderTitleComponent', () => {
  let component: BorderTitleComponent;
  let fixture: ComponentFixture<BorderTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContantCardComponent } from './contant-card.component';

describe('ContantCardComponent', () => {
  let component: ContantCardComponent;
  let fixture: ComponentFixture<ContantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContantCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

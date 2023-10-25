import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslamicDateComponent } from './islamic-date.component';

describe('IslamicDateComponent', () => {
  let component: IslamicDateComponent;
  let fixture: ComponentFixture<IslamicDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IslamicDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IslamicDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

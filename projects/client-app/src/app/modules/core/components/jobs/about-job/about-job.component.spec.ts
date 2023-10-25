import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutJobComponent } from './about-job.component';

describe('AboutJobComponent', () => {
  let component: AboutJobComponent;
  let fixture: ComponentFixture<AboutJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

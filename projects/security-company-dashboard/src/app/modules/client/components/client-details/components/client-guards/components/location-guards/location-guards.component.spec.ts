import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGuardsComponent } from './location-guards.component';

describe('LocationGuardsComponent', () => {
  let component: LocationGuardsComponent;
  let fixture: ComponentFixture<LocationGuardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationGuardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationGuardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

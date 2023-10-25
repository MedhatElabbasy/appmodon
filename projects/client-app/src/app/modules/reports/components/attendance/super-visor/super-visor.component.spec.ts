import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperVisorComponent } from './super-visor.component';

describe('SuperVisorComponent', () => {
  let component: SuperVisorComponent;
  let fixture: ComponentFixture<SuperVisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperVisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

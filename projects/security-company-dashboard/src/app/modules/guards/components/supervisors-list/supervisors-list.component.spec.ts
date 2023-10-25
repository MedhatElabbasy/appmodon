import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsListComponent } from './supervisors-list.component';

describe('SupervisorsListComponent', () => {
  let component: SupervisorsListComponent;
  let fixture: ComponentFixture<SupervisorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

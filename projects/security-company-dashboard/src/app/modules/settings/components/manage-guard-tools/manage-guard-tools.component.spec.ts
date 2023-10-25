import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGuardToolsComponent } from './manage-guard-tools.component';

describe('ManageGuardToolsComponent', () => {
  let component: ManageGuardToolsComponent;
  let fixture: ComponentFixture<ManageGuardToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGuardToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGuardToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

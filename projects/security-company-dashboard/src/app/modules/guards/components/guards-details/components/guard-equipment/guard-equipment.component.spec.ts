import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardEquipmentComponent } from './guard-equipment.component';

describe('GuardEquipmentComponent', () => {
  let component: GuardEquipmentComponent;
  let fixture: ComponentFixture<GuardEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

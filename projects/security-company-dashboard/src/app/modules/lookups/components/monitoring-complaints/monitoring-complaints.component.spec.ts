import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringComplaintsComponent } from './monitoring-complaints.component';

describe('MonitoringComplaintsComponent', () => {
  let component: MonitoringComplaintsComponent;
  let fixture: ComponentFixture<MonitoringComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringComplaintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

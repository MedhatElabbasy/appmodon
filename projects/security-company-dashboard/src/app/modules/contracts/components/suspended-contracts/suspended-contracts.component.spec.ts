import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedContractsComponent } from './suspended-contracts.component';

describe('SuspendedContractsComponent', () => {
  let component: SuspendedContractsComponent;
  let fixture: ComponentFixture<SuspendedContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendedContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

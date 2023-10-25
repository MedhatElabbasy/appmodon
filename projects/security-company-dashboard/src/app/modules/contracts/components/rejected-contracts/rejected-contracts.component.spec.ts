import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedContractsComponent } from './rejected-contracts.component';

describe('RejectedContractsComponent', () => {
  let component: RejectedContractsComponent;
  let fixture: ComponentFixture<RejectedContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedContractsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

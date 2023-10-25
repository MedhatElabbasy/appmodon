import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingOrdersComponent } from './waiting-orders.component';

describe('WaitingOrdersComponent', () => {
  let component: WaitingOrdersComponent;
  let fixture: ComponentFixture<WaitingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

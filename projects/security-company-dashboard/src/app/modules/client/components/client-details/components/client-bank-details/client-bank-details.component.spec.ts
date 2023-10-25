import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBankDetailsComponent } from './client-bank-details.component';

describe('ClientBankDetailsComponent', () => {
  let component: ClientBankDetailsComponent;
  let fixture: ComponentFixture<ClientBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBankDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

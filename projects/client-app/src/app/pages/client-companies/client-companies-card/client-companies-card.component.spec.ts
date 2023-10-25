import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompaniesCardComponent } from './client-companies-card.component';

describe('ClientCompaniesCardComponent', () => {
  let component: ClientCompaniesCardComponent;
  let fixture: ComponentFixture<ClientCompaniesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCompaniesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCompaniesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

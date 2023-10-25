import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompaniesComponent } from './client-companies.component';

describe('ClientCompaniesComponent', () => {
  let component: ClientCompaniesComponent;
  let fixture: ComponentFixture<ClientCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGuardsComponent } from './client-guards.component';

describe('ClientGuardsComponent', () => {
  let component: ClientGuardsComponent;
  let fixture: ComponentFixture<ClientGuardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGuardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientGuardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

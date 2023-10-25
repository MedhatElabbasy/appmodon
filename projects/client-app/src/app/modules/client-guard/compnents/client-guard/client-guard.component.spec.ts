import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGuardComponent } from './client-guard.component';

describe('ClientGuardComponent', () => {
  let component: ClientGuardComponent;
  let fixture: ComponentFixture<ClientGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

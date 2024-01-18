import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuditModelComponent } from './security-audit-model.component';

describe('SecurityAuditModelComponent', () => {
  let component: SecurityAuditModelComponent;
  let fixture: ComponentFixture<SecurityAuditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAuditModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAuditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

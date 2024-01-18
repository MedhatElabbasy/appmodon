import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuditModelStep3Component } from './security-audit-model-step3.component';

describe('SecurityAuditModelStep3Component', () => {
  let component: SecurityAuditModelStep3Component;
  let fixture: ComponentFixture<SecurityAuditModelStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAuditModelStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAuditModelStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

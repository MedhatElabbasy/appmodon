import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuditModelStep2Component } from './security-audit-model-step2.component';

describe('SecurityAuditModelStep2Component', () => {
  let component: SecurityAuditModelStep2Component;
  let fixture: ComponentFixture<SecurityAuditModelStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAuditModelStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAuditModelStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

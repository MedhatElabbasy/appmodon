import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuditFormNotesComponent } from './security-audit-form-notes.component';

describe('SecurityAuditFormNotesComponent', () => {
  let component: SecurityAuditFormNotesComponent;
  let fixture: ComponentFixture<SecurityAuditFormNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAuditFormNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAuditFormNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuditViewComponent } from './security-audit-view.component';

describe('SecurityAuditViewComponent', () => {
  let component: SecurityAuditViewComponent;
  let fixture: ComponentFixture<SecurityAuditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAuditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAuditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAuditPhotosComponent } from './security-audit-photos.component';

describe('SecurityAuditPhotosComponent', () => {
  let component: SecurityAuditPhotosComponent;
  let fixture: ComponentFixture<SecurityAuditPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityAuditPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAuditPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

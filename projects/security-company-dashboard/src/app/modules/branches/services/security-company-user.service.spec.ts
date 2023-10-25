import { TestBed } from '@angular/core/testing';

import { SecurityCompanyUserService } from './security-company-user.service';

describe('SecurityCompanyUserService', () => {
  let service: SecurityCompanyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityCompanyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

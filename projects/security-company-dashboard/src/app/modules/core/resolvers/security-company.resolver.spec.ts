import { TestBed } from '@angular/core/testing';

import { SecurityCompanyResolver } from './security-company.resolver';

describe('SecurityCompanyResolver', () => {
  let resolver: SecurityCompanyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SecurityCompanyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SecurityCompaniesResolver } from './security-companies.resolver';

describe('SecurityCompaniesResolver', () => {
  let resolver: SecurityCompaniesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SecurityCompaniesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

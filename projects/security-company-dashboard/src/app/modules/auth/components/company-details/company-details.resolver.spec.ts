import { TestBed } from '@angular/core/testing';

import { CompanyDetailsResolver } from './company-details.resolver';

describe('CompanyDetailsResolver', () => {
  let resolver: CompanyDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

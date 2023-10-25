import { TestBed } from '@angular/core/testing';

import { RequestQuotaResolver } from './request-quota.resolver';

describe('RequestQuotaResolver', () => {
  let resolver: RequestQuotaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestQuotaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

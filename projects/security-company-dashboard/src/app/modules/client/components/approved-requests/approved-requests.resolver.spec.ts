import { TestBed } from '@angular/core/testing';

import { ApprovedRequestsResolver } from './approved-requests.resolver';

describe('ApprovedRequestsResolver', () => {
  let resolver: ApprovedRequestsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ApprovedRequestsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

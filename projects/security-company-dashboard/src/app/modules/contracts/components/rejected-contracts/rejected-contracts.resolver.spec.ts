import { TestBed } from '@angular/core/testing';

import { RejectedContractsResolver } from './rejected-contracts.resolver';

describe('RejectedContractsResolver', () => {
  let resolver: RejectedContractsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RejectedContractsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

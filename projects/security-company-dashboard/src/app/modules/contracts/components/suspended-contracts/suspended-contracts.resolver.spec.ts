import { TestBed } from '@angular/core/testing';

import { SuspendedContractsResolver } from './suspended-contracts.resolver';

describe('SuspendedContractsResolver', () => {
  let resolver: SuspendedContractsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SuspendedContractsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

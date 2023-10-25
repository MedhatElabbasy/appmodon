import { TestBed } from '@angular/core/testing';

import { ActiveContractsResolver } from './active-contracts.resolver';

describe('ActiveContractsResolver', () => {
  let resolver: ActiveContractsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ActiveContractsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

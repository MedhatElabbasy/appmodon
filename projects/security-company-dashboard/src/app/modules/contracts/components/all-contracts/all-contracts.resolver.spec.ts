import { TestBed } from '@angular/core/testing';

import { AllContractsResolver } from './all-contracts.resolver';

describe('AllContractsResolver', () => {
  let resolver: AllContractsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AllContractsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BranchOrdersResolver } from './branch-orders.resolver';

describe('BranchOrdersResolver', () => {
  let resolver: BranchOrdersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BranchOrdersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

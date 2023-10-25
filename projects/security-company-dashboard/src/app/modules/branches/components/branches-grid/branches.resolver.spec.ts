import { TestBed } from '@angular/core/testing';

import { BranchesResolver } from './branches.resolver';

describe('BranchesResolver', () => {
  let resolver: BranchesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BranchesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

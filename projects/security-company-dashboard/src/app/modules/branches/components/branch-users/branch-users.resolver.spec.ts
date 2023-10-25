import { TestBed } from '@angular/core/testing';

import { BranchUsersResolver } from './branch-users.resolver';

describe('BranchUsersResolver', () => {
  let resolver: BranchUsersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BranchUsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

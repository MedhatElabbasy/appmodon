import { TestBed } from '@angular/core/testing';

import { ClientBranchUsersResolver } from './client-branch-users.resolver';

describe('ClientBranchUsersResolver', () => {
  let resolver: ClientBranchUsersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientBranchUsersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

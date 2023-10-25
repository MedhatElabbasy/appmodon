import { TestBed } from '@angular/core/testing';

import { ClientBranchesResolver } from './client-branches.resolver';

describe('ClientBranchesResolver', () => {
  let resolver: ClientBranchesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientBranchesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

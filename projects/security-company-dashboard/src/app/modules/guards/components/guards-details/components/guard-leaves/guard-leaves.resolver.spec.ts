import { TestBed } from '@angular/core/testing';

import { GuardLeavesResolver } from './guard-leaves.resolver';

describe('GuardLeavesResolver', () => {
  let resolver: GuardLeavesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GuardLeavesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

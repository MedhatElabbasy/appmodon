import { TestBed } from '@angular/core/testing';

import { GuardResolver } from './guard.resolver';

describe('GuardResolver', () => {
  let resolver: GuardResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GuardResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

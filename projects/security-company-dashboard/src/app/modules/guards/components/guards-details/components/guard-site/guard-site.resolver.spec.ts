import { TestBed } from '@angular/core/testing';

import { GuardSiteResolver } from './guard-site.resolver';

describe('GuardSiteResolver', () => {
  let resolver: GuardSiteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GuardSiteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

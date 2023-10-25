import { TestBed } from '@angular/core/testing';

import { SiteDetailsResolver } from './site-details.resolver';

describe('SiteDetailsResolver', () => {
  let resolver: SiteDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SiteDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

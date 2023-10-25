import { TestBed } from '@angular/core/testing';

import { ClientSiteResolver } from './client-site.resolver';

describe('ClientSiteResolver', () => {
  let resolver: ClientSiteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientSiteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

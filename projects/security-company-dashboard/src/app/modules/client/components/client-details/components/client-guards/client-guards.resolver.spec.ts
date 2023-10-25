import { TestBed } from '@angular/core/testing';

import { ClientGuardsResolver } from './client-guards.resolver';

describe('ClientGuardsResolver', () => {
  let resolver: ClientGuardsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientGuardsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

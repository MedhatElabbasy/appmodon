import { TestBed } from '@angular/core/testing';

import { LocationGuardsResolver } from './location-guards.resolver';

describe('LocationGuardsResolver', () => {
  let resolver: LocationGuardsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LocationGuardsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

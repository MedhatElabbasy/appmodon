import { TestBed } from '@angular/core/testing';

import { AccidentsResolver } from './accidents.resolver';

describe('AccidentsResolver', () => {
  let resolver: AccidentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AccidentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

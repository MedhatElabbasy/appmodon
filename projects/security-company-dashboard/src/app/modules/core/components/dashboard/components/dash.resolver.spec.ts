import { TestBed } from '@angular/core/testing';

import { DashResolver } from './dash.resolver';

describe('DashResolver', () => {
  let resolver: DashResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DashResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

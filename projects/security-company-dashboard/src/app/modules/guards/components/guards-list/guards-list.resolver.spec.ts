import { TestBed } from '@angular/core/testing';

import { GuardsListResolver } from './guards-list.resolver';

describe('GuardsListResolver', () => {
  let resolver: GuardsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GuardsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

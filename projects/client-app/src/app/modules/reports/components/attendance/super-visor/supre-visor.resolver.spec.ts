import { TestBed } from '@angular/core/testing';

import { SupreVisorResolver } from './supre-visor.resolver';

describe('SupreVisorResolver', () => {
  let resolver: SupreVisorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SupreVisorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

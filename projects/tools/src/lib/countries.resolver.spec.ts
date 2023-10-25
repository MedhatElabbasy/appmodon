import { TestBed } from '@angular/core/testing';

import { CountriesResolver } from './countries.resolver';

describe('CountriesResolver', () => {
  let resolver: CountriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

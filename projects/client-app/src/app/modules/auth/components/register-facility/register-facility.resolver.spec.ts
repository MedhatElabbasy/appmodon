import { TestBed } from '@angular/core/testing';

import { RegisterFacilityResolver } from './register-facility.resolver';

describe('RegisterFacilityResolver', () => {
  let resolver: RegisterFacilityResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RegisterFacilityResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CompanyShiftsResolver } from './company-shifts.resolver';

describe('CompanyShiftsResolver', () => {
  let resolver: CompanyShiftsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CompanyShiftsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

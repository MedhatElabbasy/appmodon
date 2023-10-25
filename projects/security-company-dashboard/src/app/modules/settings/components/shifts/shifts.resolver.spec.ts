import { TestBed } from '@angular/core/testing';

import { ShiftsResolver } from './shifts.resolver';

describe('ShiftsResolver', () => {
  let resolver: ShiftsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShiftsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

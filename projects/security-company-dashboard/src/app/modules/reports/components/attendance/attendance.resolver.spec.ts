import { TestBed } from '@angular/core/testing';

import { AttendanceResolver } from './attendance.resolver';

describe('AttendanceResolver', () => {
  let resolver: AttendanceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AttendanceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SafetyGuard } from './safety.guard';

describe('SafetyGuard', () => {
  let guard: SafetyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SafetyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

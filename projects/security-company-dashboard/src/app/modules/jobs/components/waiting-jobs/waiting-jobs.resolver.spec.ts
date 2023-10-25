import { TestBed } from '@angular/core/testing';

import { WaitingJobsResolver } from './waiting-jobs.resolver';

describe('WaitingJobsResolver', () => {
  let resolver: WaitingJobsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WaitingJobsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

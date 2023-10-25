import { TestBed } from '@angular/core/testing';

import { JobDetailsResolver } from './job-details.resolver';

describe('JobDetailsResolver', () => {
  let resolver: JobDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

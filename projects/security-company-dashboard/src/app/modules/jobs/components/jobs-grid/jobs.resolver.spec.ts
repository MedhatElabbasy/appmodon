import { TestBed } from '@angular/core/testing';

import { JobsResolver } from './jobs.resolver';

describe('JobsResolver', () => {
  let resolver: JobsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

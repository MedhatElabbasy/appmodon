import { TestBed } from '@angular/core/testing';

import { NewRequestsResolver } from './new-requests.resolver';

describe('NewRequestsResolver', () => {
  let resolver: NewRequestsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewRequestsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

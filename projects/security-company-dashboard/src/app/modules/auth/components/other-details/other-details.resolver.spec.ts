import { TestBed } from '@angular/core/testing';

import { OtherDetailsResolver } from './other-details.resolver';

describe('OtherDetailsResolver', () => {
  let resolver: OtherDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OtherDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

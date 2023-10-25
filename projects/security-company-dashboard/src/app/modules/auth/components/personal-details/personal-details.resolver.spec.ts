import { TestBed } from '@angular/core/testing';

import { PersonalDetailsResolver } from './personal-details.resolver';

describe('PersonalDetailsResolver', () => {
  let resolver: PersonalDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PersonalDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

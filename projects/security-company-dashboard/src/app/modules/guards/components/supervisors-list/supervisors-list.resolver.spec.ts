import { TestBed } from '@angular/core/testing';

import { SupervisorsListResolver } from './supervisors-list.resolver';

describe('SupervisorsListResolver', () => {
  let resolver: SupervisorsListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SupervisorsListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

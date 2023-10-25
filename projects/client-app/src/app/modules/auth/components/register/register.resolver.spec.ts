import { TestBed } from '@angular/core/testing';

import { RegisterResolver } from './register.resolver';

describe('RegisterResolver', () => {
  let resolver: RegisterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RegisterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

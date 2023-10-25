import { TestBed } from '@angular/core/testing';

import { ManagGuardToolsResolver } from './manag-guard-tools.resolver';

describe('ManagGuardToolsResolver', () => {
  let resolver: ManagGuardToolsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ManagGuardToolsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

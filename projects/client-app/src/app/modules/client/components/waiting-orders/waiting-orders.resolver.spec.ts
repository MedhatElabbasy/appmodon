import { TestBed } from '@angular/core/testing';

import { WaitingOrdersResolver } from './waiting-orders.resolver';

describe('WaitingOrdersResolver', () => {
  let resolver: WaitingOrdersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WaitingOrdersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

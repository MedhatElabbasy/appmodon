import { TestBed } from '@angular/core/testing';

import { OfferDetailsResolver } from './offer-details.resolver';

describe('OfferDetailsResolver', () => {
  let resolver: OfferDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OfferDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

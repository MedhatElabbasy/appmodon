import { TestBed } from '@angular/core/testing';

import { OfferDetailsService } from './offer-details.service';

describe('OfferDetailsService', () => {
  let service: OfferDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LocationAddressService } from './location-address.service';

describe('LocationAddressService', () => {
  let service: LocationAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

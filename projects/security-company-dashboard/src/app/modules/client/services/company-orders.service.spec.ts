import { TestBed } from '@angular/core/testing';

import { CompanyOrdersService } from './company-orders.service';

describe('CompanyOrdersService', () => {
  let service: CompanyOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

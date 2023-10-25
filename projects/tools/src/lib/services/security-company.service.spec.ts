/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityCompanyService } from './security-company.service';

describe('Service: SecurityCompany', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityCompanyService]
    });
  });

  it('should ...', inject([SecurityCompanyService], (service: SecurityCompanyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyGuardsService } from './company-guards.service';

describe('Service: CompanyGuards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyGuardsService]
    });
  });

  it('should ...', inject([CompanyGuardsService], (service: CompanyGuardsService) => {
    expect(service).toBeTruthy();
  }));
});

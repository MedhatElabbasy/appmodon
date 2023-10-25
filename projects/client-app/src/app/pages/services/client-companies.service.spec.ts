import { TestBed } from '@angular/core/testing';

import { ClientCompaniesService } from './client-companies.service';

describe('ClientCompaniesService', () => {
  let service: ClientCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

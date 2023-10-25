import { TestBed } from '@angular/core/testing';

import { ClientprofileService } from './clientprofile.service';

describe('ClientprofileService', () => {
  let service: ClientprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

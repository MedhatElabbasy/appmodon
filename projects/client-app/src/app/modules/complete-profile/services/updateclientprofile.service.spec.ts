import { TestBed } from '@angular/core/testing';

import { UpdateclientprofileService } from './updateclientprofile.service';

describe('UpdateclientprofileService', () => {
  let service: UpdateclientprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateclientprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

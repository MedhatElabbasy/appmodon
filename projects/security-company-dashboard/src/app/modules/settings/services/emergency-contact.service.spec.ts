import { TestBed } from '@angular/core/testing';

import { EmergencyContactService } from './emergency-contact.service';

describe('EmergencyContactService', () => {
  let service: EmergencyContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttachmentService } from './attachment.service';

describe('Service: Attachment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachmentService]
    });
  });

  it('should ...', inject([AttachmentService], (service: AttachmentService) => {
    expect(service).toBeTruthy();
  }));
});

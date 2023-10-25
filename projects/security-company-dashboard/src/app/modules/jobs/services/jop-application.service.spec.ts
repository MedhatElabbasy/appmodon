/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JopApplicationService } from './jop-application.service';

describe('Service: JopApplication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JopApplicationService]
    });
  });

  it('should ...', inject([JopApplicationService], (service: JopApplicationService) => {
    expect(service).toBeTruthy();
  }));
});

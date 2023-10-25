/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SchedulesService } from './schedules.service';

describe('Service: Schedules', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulesService]
    });
  });

  it('should ...', inject([SchedulesService], (service: SchedulesService) => {
    expect(service).toBeTruthy();
  }));
});

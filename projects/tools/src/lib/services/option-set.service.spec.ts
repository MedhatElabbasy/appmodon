/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OptionSetService } from './option-set.service';

describe('Service: OptionSet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionSetService]
    });
  });

  it('should ...', inject([OptionSetService], (service: OptionSetService) => {
    expect(service).toBeTruthy();
  }));
});

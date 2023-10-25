/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuardsService } from './guards.service';

describe('Service: Guards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardsService]
    });
  });

  it('should ...', inject([GuardsService], (service: GuardsService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientBranchesService } from './client-branches.service';

describe('Service: ClientBranches', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientBranchesService]
    });
  });

  it('should ...', inject([ClientBranchesService], (service: ClientBranchesService) => {
    expect(service).toBeTruthy();
  }));
});

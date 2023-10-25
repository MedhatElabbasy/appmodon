import { TestBed } from '@angular/core/testing';

import { ManageGuardToolsService } from './manage-guard-tools.service';

describe('ManageGuardToolsService', () => {
  let service: ManageGuardToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageGuardToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

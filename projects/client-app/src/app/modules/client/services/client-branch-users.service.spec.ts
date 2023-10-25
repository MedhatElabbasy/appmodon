import { TestBed } from '@angular/core/testing';

import { ClientBranchUsersService } from './client-branch-users.service';

describe('ClientBranchUsersService', () => {
  let service: ClientBranchUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBranchUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PostPorposalService } from './post-porposal.service';

describe('PostPorposalService', () => {
  let service: PostPorposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostPorposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VisitorsReportsResolver } from './visitors-reports.resolver';

describe('VisitorsReportsResolver', () => {
  let resolver: VisitorsReportsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VisitorsReportsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

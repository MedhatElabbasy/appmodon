/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientSiteService } from './client-site.service';

describe('Service: ClientSite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientSiteService]
    });
  });

  it('should ...', inject([ClientSiteService], (service: ClientSiteService) => {
    expect(service).toBeTruthy();
  }));
});

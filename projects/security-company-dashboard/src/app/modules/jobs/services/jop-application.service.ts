import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { Observable } from 'rxjs';
import { Pagination } from 'projects/tools/src/public-api';
import { AcceptApplicationModel } from '../models/accept-application-model';

import { JobApplication } from '../models/job-app';
import { JobDetails } from '../models/job-details.enum';

@Injectable({
  providedIn: 'root',
})
export class JopApplicationService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}

  getAllByJobId(
    pageNumber: number,
    pageSize: number,
    jobId: number
  ): Observable<Pagination<JobApplication>> {
    return this.http.get<Pagination<JobApplication>>(
      this.url +
        `api/JobApplication/GetAllByJobId?JopId=${jobId}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  acceptApplication(model: AcceptApplicationModel) {
    return this.http.post<JobDetails>(
      this.url + `api/CompanySecurityGuard/Add`,
      model
    );
  }
  rejectApplication(id: number) {
    return this.http.post(
      this.url + `api/JobApplication/Delete?id=${id}`,
      null
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { exhaustMap, Observable, Subject, take, tap } from 'rxjs';
import { Pagination } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';

import { Job } from '../models/job';
import { JobDetails } from '../models/job-details.enum';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly url = environment.api;
  private _updates = new Subject<any>();
  jobs!: Pagination<Job>;

  constructor(private http: HttpClient, private auth: AuthService) {}

  get updates(): Observable<Pagination<Job>> {
    return this._updates.asObservable();
  }

  getAllByCompanyId(pageNumber: number, pageSize: number) {
    let id = this.auth.snapshot.userInfo?.id;
    return this.http
      .get<Pagination<any>>(
        this.url +
          `api/CompanyJob/GetAllByCompanyId?id=${id}&page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.jobs = response;
          this._updates.next(this.jobs);
        })
      );
  }

  add(model: Job) {
    return this.http.post<Job>(this.url + `api/CompanyJob/Create`, model);
  }

  update(model: any) {
    this.http
      .post<Job>(this.url + `api/CompanyJob/Update`, model)
      .subscribe((response) => {
        const index = this.jobs.data.findIndex((e) => e.id == model.id);

        this.jobs.data[index] = response;
        this._updates.next(this.jobs);
      });
  }

  updateJobDetails(model: any) {
    return this.http.post<any>(this.url + `api/CompanyJob/Update`, model);
  }

  getJobDetails(id: any) {
    return this.http.get<JobDetails>(
      this.url + `api/CompanyJob/GetById?id=${id}`
    );
  }

  delete(id: any) {
    this.http
      .post(this.url + `api/CompanyJob/Delete?id=${id}`, null)
      .subscribe((response) => {
        if (response) {
          let res = this.jobs.data.filter((e) => e.id != id);
          this.jobs.data = [...res];
          this._updates.next(this.jobs);
        }
      });
  }

  getAllApprovedByMainBranch(pageNumber: number, pageSize: number) {
    let id = this.auth.snapshot.userInfo?.id;
    return this.http
      .get<any>(
        this.url +
          `api/CompanyJob/GetAllApprovedByMainBranch?id=${id}&page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.jobs = response;
          this._updates.next(this.jobs);
        })
      );
  }

  getAllWaitingApproveByMain(pageNumber: number, pageSize: number) {
    let id = this.auth.snapshot.userInfo?.id;

    return this.http.get<Pagination<JobDetails>>(
      this.url +
        `api/CompanyJob/GetAllWattingApprovedByMainBranch?id=${id}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllWaitingApproveByBranch(pageNumber: number, pageSize: number) {
    let id = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http.get<Pagination<JobDetails>>(
      this.url +
        `api/CompanyJob/GetAllWattingApprovedByBranch?id=${id}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllApprovedByBranch(pageNumber: number, pageSize: number) {
    let id = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http
      .get<Pagination<any>>(
        this.url +
          `api/CompanyJob/GetAllApprovedByBranch?id=${id}&page=${pageNumber}&pageSize=${pageSize}`
      )
      .pipe(
        tap((response) => {
          this.jobs = response;
          this._updates.next(this.jobs);
        })
      );
  }

  approveJob(jobId: number) {
    let id = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http.post(
      this.url +
        `api/CompanyJob/ApprovedByMainBranch?id=${jobId}&BranchId=${id}`,
      null
    );
  }
}

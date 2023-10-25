import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Observable } from 'rxjs';
import { Gender, job, JobType } from '../models/job';
import { FormGroup } from '@angular/forms';
import { Pagination } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}
  getAllJobs(page: number, pageSize: number, id:string): Observable<job> {
    return this.http.get<job>(
      `${this.url}api/CompanyJob/GetAll?guardId=${id}&page=${page}&pageSize=${pageSize}`
    );
  }

  getAllSavedJobs(page: number, pageSize: number, id:number): Observable<job> {
    return this.http.get<job>(
      `${this.url}api/SavedJop/GetAll?id=${id}&page=${page}&pageSize=${pageSize}`
    );
  }
  getJobType(): Observable<JobType> {
    return this.http.get<JobType>(`${this.url}api/JobType/GetAll`);
  }
  getJobShift(): Observable<Gender> {
    return this.http.get<JobType>(`${this.url}api/ShiftType/GetAll`);
  }
  getGender(): Observable<Gender> {
    return this.http.get<JobType>(`${this.url}api/Gender/GetAll`);
  }
  saveJob(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}api/SavedJop/Add`, data);
  }
  getJob(id: number): Observable<Gender> {
    return this.http.get<JobType>(`${this.url}api/CompanyJob/GetById?id=${id}`);
  }
  applay(data: FormGroup): Observable<any> {
    return this.http.post<any>(
      `${this.url}api/JobApplication/Create`,
      data.value
    );
  }
  RequestsJob(id: number, pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<job>>(
      environment.api +
        `api/JobApplication/GetByUserId?id=${id}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getCurrentJob(id: number) {
    return this.http.get(
      environment.api +
        `api/CompanySecurityGuard/GetSecurityGuardCompanies?Guardid=${id}`
    );
  }
}

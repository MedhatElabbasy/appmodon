import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { Pagination } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';
import { Shift } from '../models/shift';
import { ShiftModel } from '../models/shift-model';

@Injectable({
  providedIn: 'root',
})
export class ShiftsService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) {}

  getAll(pageNumber: number, pageSize: number) {
    let companyID = this.auth.snapshot.userInfo?.id;
    return this.http.get<Pagination<Shift>>(
      this.url +
        `api/SecurityCompanyShift/GetAllbySecurityCompanyid?companyID=${companyID}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  add(model: ShiftModel) {
    return this.http.post(this.url + `api/SecurityCompanyShift/Create`, model);
  }
}

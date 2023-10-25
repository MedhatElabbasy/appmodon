import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { exhaustMap, map, take } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AddBranchModel } from '../models/add-branch-model';
import { Branch } from '../models/branch';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  private readonly url = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllByCompanyId() {
    return this.auth.userInfo.pipe(
      take(1),
      exhaustMap((company) => {
        return this.http
          .get<Branch[]>(
            this.url +
              `api/SecurityCompanyBranch/GetAllByCompanyId?id=${company?.id}`
          )
          .pipe(
            map((response) => {
              const index = response.findIndex((e) => e.isMainBranch);
              let branch = response[index];
              response.splice(index, 1);
              response.unshift(branch);
              return response;
            })
          );
      })
    );
  }

  add(model: AddBranchModel) {
    return this.http.post(this.url + `api/SecurityCompanyBranch/Add`, model);
  }

  edit(model: AddBranchModel) {
    return this.http.post(this.url + `api/SecurityCompanyBranch/Update`, model);
  }

  delete(id: any) {
    return this.http.post(
      this.url + `api/SecurityCompanyBranch/Delete?id=${id}`,
      null
    );
  }

  getBranchById(id: any) {
    return this.http.get<Branch>(
      this.url + `api/SecurityCompanyBranch/GetById?id=${id}`
    );
  }
}

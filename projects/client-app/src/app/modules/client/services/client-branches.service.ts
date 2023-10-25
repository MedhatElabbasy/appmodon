import { ClientBranchUser } from './../models/client-branch-user';
import { ClientBranch } from './../models/client-branch';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { ClientCompany, Roles } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class ClientBranchesService {
  private readonly url = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllBranches() {
    let clientId;

    if (this.auth.snapshot.userIdentity?.role == Roles.ClientCompanyUser) {
      clientId = (this.auth.snapshot.userInfo as ClientBranchUser)
        .clientCompanyBranch.clientCompanyId;
    } else {
      clientId = this.auth.snapshot.userInfo?.id;
    }
   return this.http.get<ClientBranch[]>(
      this.url + `api/ClientCompanyBranch/GetAllByCompanyId?id=${clientId}`
    );
  }

  getBranchById(branchId: any) {
    return this.http.get<ClientBranch>(
      this.url + `api/ClientCompanyBranch/GetById?id=${branchId}`
    );
  }

  addBranch(model: ClientBranch) {
    return this.http.post<ClientBranch>(
      this.url + `api/ClientCompanyBranch/Add`,
      model
    );
  }

  updateBranch(model: ClientBranch) {
    return this.http.post<ClientBranch>(
      this.url + `api/ClientCompanyBranch/Update`,
      model
    );
  }

  deleteBranch(id: string) {
    return this.http.post<boolean>(
      this.url + `api/ClientCompanyBranch/Delete?id=${id}`,
      null
    );
  }
}

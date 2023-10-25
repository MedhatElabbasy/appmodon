import { ClientBranchUser } from './../models/client-branch-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientBranchUsersService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}

  getAllUsersByBranchId(id: string) {
    return this.http.get<ClientBranchUser[]>(
      this.url + `api/ClientCompanyUser/GetAllByBransh?Id=${id}`
    );
  }

  getAllUsersByClientId(id: number) {
    return this.http.get<ClientBranchUser[]>(
      this.url + `api/ClientCompanyUser/GetAllByClient?Id=${id}`
    );
  }

  getUserById(id: string) {
    return this.http.get(this.url + `api/ClientCompanyUser/Get?Id=${id}`);
  }

  add(model: ClientBranchUser) {
    return this.http.post(this.url + `api/ClientCompanyUser/Add`, model);
  }

  update(model: ClientBranchUser) {
    return this.http.post(this.url + `api/ClientCompanyUser/Update`, model);
  }

  delete(id: string) {
    return this.http.post(
      this.url + `api/ClientCompanyUser/Delete?Id=${id}`,
      null
    );
  }
}

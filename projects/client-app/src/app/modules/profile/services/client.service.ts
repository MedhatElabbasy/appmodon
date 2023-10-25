import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { ClientCompany } from '../../auth/models/client-company.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) { }

  update(model: ClientCompany) {
    return this.http.post<ClientCompany>(
      this.url + `api/ClientCompany/Update`,
      model
    );
  }

  updateUser(model: ClientCompany) {
    return this.http.post<ClientCompany>(
      this.url + `api/ClientCompanyUser/Update`,
      model
    );
  }

  jobType() {
    return this.http.get(this.url + `api/JobType/GetAll`)
  }
}

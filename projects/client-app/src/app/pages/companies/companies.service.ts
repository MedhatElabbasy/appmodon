import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Pagination, SecurityCompany } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}

  getApprovedCompanies(pageNumber: number, pageSize: number) {
    return this.http.get<Pagination<SecurityCompany>>(
      environment.api +
        `api/SecurityCompany/GetAllApproved?page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getAllApprovedSearch(pageNumber: number, pageSize: number , text:string){
    return this.http.get<Pagination<SecurityCompany>>(
      environment.api +
        `api/SecurityCompany/GetAllApprovedSearch?SearchKey=${text}&page=${pageNumber}&pageSize=${pageSize}`
    );

  }


  getAllLocationsById(locationID:string){
    return this.http.get(this.url +`api/GuardLocation/GetAllByLocationId?LocationId=${locationID}`)
  }
}

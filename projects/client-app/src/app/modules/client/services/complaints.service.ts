import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}
  getAll(pageNumber: number, pageSize: number,clientId:number): Observable<any> {
    return this.http.get<any>(
      `${this.url}api/RasdInfraction/GetAllByClient?page=${pageNumber}&pageSize=${pageSize}&ClientId=${clientId}`
    );
  }

  getDetails(id: string): Observable<any> {
    return this.http.get(`${this.url}api/RasdInfraction/Get?id=${id}`);
  }

  getAllClientUser(pageNumber: number, pageSize: number,clientUserId:number): Observable<any> {
    return this.http.get<any>(
      `${this.url}api/RasdInfraction/GetAllBySecurityCompanyBranchId?page=${pageNumber}&pageSize=${pageSize}&SecurityCompanyBranchId=${clientUserId}`
    );
  }

  getAllByClientCompanyBranchId(ClientCompanyBranchId:string ,pageNumber: number, pageSize: number ){
    return this.http.get<any>(
      `${this.url}api/RasdInfraction/GetAllByClientCompanyBranchId?ClientCompanyBranchId=${ClientCompanyBranchId}&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

}

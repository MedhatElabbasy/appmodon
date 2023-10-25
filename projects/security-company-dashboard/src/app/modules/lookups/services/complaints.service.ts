import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { Observable } from 'rxjs';
import { RasdInfraction } from '../model/RasdInfraction';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) {}
  getAll(pageNumber: number, pageSize: number,companyId:number): Observable<any> {
    return this.http.get<any>(
      `${this.url}api/RasdInfraction/GetAllByCompany?page=${pageNumber}&pageSize=${pageSize}&companyId=${companyId}`
    );
  }

  getDetails(id: string): Observable<any> {
    return this.http.get(`${this.url}api/RasdInfraction/Get?id=${id}`);
  }

}

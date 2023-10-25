import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientCompaniesService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}
  getALL(page: number, pageSize: number): Observable<any> {
    return this.http.get(
      this.url +
        `api/ClientCompany/GetAllClientCompany?page=${page}&pageSize=${pageSize}`
    );
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';

import { Agent } from '../model/agent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) {}
  getAllCompanyAgent(): Observable<Agent[]> {
    let id = this.auth.snapshot.userInfo?.id;
    return this.http.get<Agent[]>(
      this.url + `api/Agent/GetAllCompanyAgent?companyId=${id}`
    );
  }
  getAllAcceptedCompanyAgent(): Observable<Agent[]> {
    let id = this.auth.snapshot.userInfo?.id;
    return this.http.get<Agent[]>(
      this.url + `api/Agent/GetAllApproveByCompanyId?companyId=${id}`
    );
  }
  getWaitingAcceptedCompanyAgent(): Observable<Agent[]> {
    let id = this.auth.snapshot.userInfo?.id;
    return this.http.get<Agent[]>(
      this.url + `api/Agent/GetAllWatingApproveByCompanyId?companyId=${id}`
    );
  }
  active(id: string) {
   
    return this.http
      .post(`${this.url}api/Agent/Activate?id=${id}`, null)
      .subscribe();
  }
  deActive(id: string) {
    return this.http
      .post(`${this.url}api/Agent/DActivate?id=${id}`, null)
      .subscribe();
  }
  approve(id: string) {
    return this.http.post(`${this.url}api/Agent/Approve?id=${id}`, null);
  }
  reject(id: string) {
    return this.http.post(`${this.url}api/Agent/Approve?id=${id}`, null);
  }
}

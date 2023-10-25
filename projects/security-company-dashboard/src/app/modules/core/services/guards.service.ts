import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { CompanySecurityGuard } from '../../client/models/site-details';

@Injectable({
  providedIn: 'root',
})
export class GuardsService {
  private readonly url = environment.api;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllAvailableGuardByCompany() {
    let companyId = this.auth.snapshot.userInfo?.id;

    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllNotOnLocationByCompanyId?companyId=${companyId}&IsSupervisor=false`
    );
  }

  getAllAvailableSupervisorsByCompany() {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllNotOnLocationByCompanyId?companyId=${companyId}&IsSupervisor=true`
    );
  }

  getAllAvailableGuardByBranch() {
    let companyId = this.auth.snapshot.userInfo?.id;
    let branchId = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllNotOnLocationByCompanyIdAndBranch?companyId=${companyId}&branchId=${branchId}&IsSupervisor=false`
    );
  }

  getAllAvailableSupervisorsByBranch() {
    let companyId = this.auth.snapshot.userInfo?.id;
    let branchId = this.auth.snapshot.userInfo?.securityCompanyBranch.id;

    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllNotOnLocationByCompanyIdAndBranch?companyId=${companyId}&branchId=${branchId}&IsSupervisor=true`
    );
  }
  getById(id: string) {
    return this.http.get<CompanySecurityGuard[]>(
      this.url + `api/SecurityGuard/GetByUserId?userId=${id}`
    );
  }
}

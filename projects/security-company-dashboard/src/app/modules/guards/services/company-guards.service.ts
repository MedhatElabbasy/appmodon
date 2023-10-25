import { ApprovedStatus } from './../../../../../../tools/src/lib/enums/option-set.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { OptionSetEnum } from 'projects/tools/src/public-api';
import { AuthService } from '../../auth/services/auth.service';
import { ClientSite } from '../../client/models/client-site';
import {
  CompanySecurityGuard,
  SiteLocation,
} from '../../client/models/site-details';
import { GuardLeaves } from '../models/guard-leaves';
import { companyEquipment } from '../../settings/models/companyEquipment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CompanyGuardsService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) {}
  getAllGuardsOnCompany() {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllGuardOnCompanyById?companyId=${companyId}&IsSupervisor=false`
    );
  }
  getAllSupervisorsOnCompany() {
    let companyId = this.auth.snapshot.userInfo?.id;
    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllGuardOnCompanyById?companyId=${companyId}&IsSupervisor=true`
    );
  }

  getAllGuardsOnBranch() {
    let companyId = this.auth.snapshot.userInfo?.id;
    let BranchId = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllGuardOnCompanyByIdAndBranch?companyId=${companyId}&BranchId=${BranchId}&IsSupervisor=false`
    );
  }

  getAllSupervisorsOnBranch() {
    let companyId = this.auth.snapshot.userInfo?.id;
    let BranchId = this.auth.snapshot.userInfo?.securityCompanyBranch.id;
    return this.http.get<CompanySecurityGuard[]>(
      this.url +
        `api/GuardLocation/GetAllGuardOnCompanyByIdAndBranch?companyId=${companyId}&BranchId=${BranchId}&IsSupervisor=true`
    );
  }

  getGuardSites(id: string) {
    return this.http.get<SiteLocation[]>(
      this.url + `api/GuardLocation/GetAllLocationByGuardId?GuardId=${id}`
    );
  }

  getLeavesByCompanyGuardId(id: string) {
    return this.http.get<GuardLeaves[]>(
      this.url + `api/LeaveRequest/GetAllByDateGuardId?GuardId=${id}`
    );
  }

  getEquipmentsByCompanyGuardId(id: string) {
    return this.http.get<companyEquipment[]>(
      this.url +
        `api/GuardEquipment/GetAllBySecurityGuardId?SecurityGuardId=${id}`
    );
  }
  addEquipmentToUser(data: FormGroup) {
    return this.http.post(this.url + `api/GuardEquipment/Add`, data.value);
  }
  rejectRequest(id: string) {
    return this.http.post(
      this.url +
        `api/LeaveRequest/UpdateLeaveRequest?id=${id}&optionSetName=${OptionSetEnum.ApprovedStatus}&value=${ApprovedStatus.rejected}`,
      null
    );
  }

  acceptRequest(id: string) {
    return this.http.post(
      this.url +
        `api/LeaveRequest/UpdateLeaveRequest?id=${id}&optionSetName=${OptionSetEnum.ApprovedStatus}&value=${ApprovedStatus.approved}`,
      null
    );
  }
  uploadFile(attachmentId: number, companyId: number) {
    return this.http.get(
      this.url +
        `api/CompanySecurityGuard/UploadExelFileAndSendMessage?attachmentId=${attachmentId}&companyId=${companyId}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { companyEquipment } from '../models/companyEquipment';
@Injectable({
  providedIn: 'root',
})
export class ManageGuardToolsService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) {}
  getAll() {
    let companyID = this.auth.snapshot.userInfo?.id;
    return this.http.get<companyEquipment[]>(
      `${this.url}api/CompanyEquipment/GetAllBySecurityCompanyId?CompanyId=${companyID}`
    );
  }
  AddEquipment(Data: companyEquipment) {
    return this.http.post<companyEquipment>(
      `${this.url}api/CompanyEquipment/Add`,
      Data
    );
  }
  UpdateEquipment(Data: companyEquipment) {
    return this.http.post<companyEquipment>(
      `${this.url}api/CompanyEquipment/Update`,
      Data
    );
  }
  deleteEquipment(id: string) {
    return this.http.post<companyEquipment>(
      `${this.url}api/CompanyEquipment/Delete?id=${id}`,
      null
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { EmergencyContact } from './../models/EmergencyContact';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmergencyContactService {
  private readonly url = environment.api;
  addItem!: any;
  updateItem!: any;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.addItem = new BehaviorSubject(null);
    this.updateItem = new BehaviorSubject(null);
  }
  addEmergencyContact(Data: FormGroup) {
    return this.http.post(`${this.url}api/EmergencyContact/Add`, Data.value);
  }
  getAll() {
    let companyID = this.auth.snapshot.userInfo?.id;
    return this.http.get<EmergencyContact[]>(
      `${this.url}api/EmergencyContact/GetAllByCompanyId?id=${companyID}`
    );
  }
  updateEmergencyContact(Data: EmergencyContact) {
    return this.http.post(`${this.url}api/EmergencyContact/Update`, Data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { AddSiteShiftModel } from '../models/add-site-shift-model';
import { ClientSite } from '../models/client-site';
import { GuardLocation, GuardLocationModel } from '../models/guard-location';
import {
  CompanySecurityGuard,
  SiteDetails,
  SiteLocation,
} from '../models/site-details';

@Injectable({
  providedIn: 'root',
})
export class ClientSiteService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) {}

  getAllByClientId(id: string) {
    return this.http.get<ClientSite[]>(
      this.url + `api/ClientSite/GetAllByClientId?id=${id}`
    );
  }

  addSite(model: ClientSite) {
    return this.http.post(this.url + `api/ClientSite/Add`, model);
  }

  getAllLocationBySiteId(id: any) {
    return this.http.get(
      this.url + `api/ClientSite/GetAllSiteLocationBySiteId?id=${id}`
    );
  }

  getSiteById(id: any) {
    return this.http.get<SiteDetails>(
      this.url + `api/ClientSite/GetById?id=${id}`
    );
  }

  addSiteShift(model: AddSiteShiftModel) {
    return this.http.post(
      this.url + `api/ClientSite/AddSiteSupervisorShift`,
      model
    );
  }

  editSiteShift(model: AddSiteShiftModel) {
    return this.http.post(
      this.url + `api/ClientSite/UpdateSiteSupervisorShift`,
      model
    );
  }

  deleteSiteShift(id: string) {
    return this.http.post(
      this.url + `api/ClientSite/DeleteSiteSupervisorShift?id=${id}`,
      null
    );
  }

  getAllGuardsOnLocationByLocationId(locationId: string) {
    return this.http.get<GuardLocation[]>(
      this.url + `api/GuardLocation/GetAllByLocationId?LocationId=${locationId}`
    );
  }

  addGuardOnLocation(model: GuardLocationModel) {
    return this.http.post(this.url + `api/GuardLocation/Add`, model);
  }

  deleteGuardFromLocation(id: string) {
    return this.http.post(this.url + `api/GuardLocation/Delete?id=${id}`, null);
  }

  updateSiteLocation(model: SiteLocation) {
    return this.http.post(
      this.url + 'api/ClientSite/UpdateSiteLocation',
      model
    );
  }

  addSiteLocation(model: SiteLocation) {
    return this.http.post(this.url + 'api/ClientSite/AddSiteLocation', model);
  }

  updateSite(model: ClientSite) {
    return this.http.post(this.url + `api/ClientSite/Update`, model);
  }
}

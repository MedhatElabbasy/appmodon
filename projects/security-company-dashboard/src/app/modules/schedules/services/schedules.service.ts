import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { ClientShiftModel } from '../models/client-shift-model';
import { BreakScheduling, Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}

  getAllShifts(id: string) {
    return this.http.get(
      this.url +
        `api/ClientShiftSchedule/GetAllBySecurityCompanyClientId?id=${id}`
    );
  }

  addShiftSchedule(model: ClientShiftModel) {
    return this.http.post(this.url + `api/ClientShiftSchedule/Add`, model);
  }

  updateShiftSchedule(model: ClientShiftModel) {
    return this.http.post(this.url + `api/ClientShiftSchedule/Update`, model);
  }

  addSchedule(model: Schedule) {
    return this.http.post(this.url + `api/Scheduling/Add`, model);
  }

  updateSchedule(model: Schedule) {
    return this.http.post(this.url + `api/Scheduling/Update`, model);
  }

  updateBreak(model: BreakScheduling) {
    return this.http.post(
      this.url + `api/Scheduling/UpdateBreakScheduling`,
      model
    );
  }

  deleteBreak(id: string) {
    return this.http.post(
      this.url + `api/Scheduling/DeleteBreakScheduling?id=${id}`,
      null
    );
  }
  deleteShift(id: string) {
    return this.http.post(
      this.url + `api/ClientShiftSchedule/Delete?id=${id}`,
      null
    );
  }
  deleteSchedule(id: string) {
    return this.http.post(
      this.url + `api/Scheduling/Delete?id=${id}`,
      null
    );
  }
}

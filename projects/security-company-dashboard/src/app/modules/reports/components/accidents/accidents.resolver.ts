import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { convertDateToString } from 'projects/tools/src/public-api';
import { Loader } from '../../../core/enums/loader.enum';
import { Incident } from '../../models/incident';
import { ReportsService } from '../../services/reports.service';

@Injectable({
  providedIn: 'root',
})
export class AccidentsResolver implements Resolve<Incident[]> {
  constructor(private reports: ReportsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Incident[]> {
    let startDate = convertDateToString(new Date());
    return this.reports.getAllAccidentByCompany(
      startDate,
      startDate,
      Loader.yes
    );
  }
}

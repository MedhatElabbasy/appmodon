import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { LookupService } from 'projects/tools/src/public-api';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import { JopApplicationService } from '../../services/jop-application.service';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsResolver implements Resolve<any> {
  constructor(
    private job: JobService,
    private jobApp: JopApplicationService,
    private lookups: LookupService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.params['id'];
    let details$ = this.job.getJobDetails(id);
    let apps$ = this.jobApp.getAllByJobId(1, 10, id);
    let jobTypes$ = this.lookups.getJobType();
    let genders$ = this.lookups.getGender();
    let shift$ = this.lookups.getShiftType();

    return combineLatest([details$, apps$, jobTypes$, genders$, shift$]).pipe(
      map((res) => {
        return {
          details: res[0],
          apps: res[1],
          jobTypes: res[2],
          genders: res[3],
          shifts: res[4],
        };
      })
    );
  }
}

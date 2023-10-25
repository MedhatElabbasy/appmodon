import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, take } from 'rxjs';
import { LookupService, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { JobService } from '../../services/job.service';

@Injectable({
  providedIn: 'root',
})
export class JobsResolver implements Resolve<any> {
  constructor(
    private lookups: LookupService,
    private job: JobService,
    private auth: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );

    let jobTypes$ = this.lookups.getJobType();
    let genders$ = this.lookups.getGender();
    let shift$ = this.lookups.getShiftType();
    let jobs$ = isAdmin
      ? this.job.getAllApprovedByMainBranch(1, 10)
      : this.job.getAllApprovedByBranch(1, 10);

    return combineLatest([jobTypes$, genders$, shift$, jobs$]).pipe(
      map((res) => ({
        jobTypes: res[0],
        genders: res[1],
        shifts: res[2],
        jobs: res[3],
      }))
    );
  }
}

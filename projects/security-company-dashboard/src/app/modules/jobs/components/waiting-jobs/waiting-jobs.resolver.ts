import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { JobDetails } from '../../models/job-details.enum';
import { JobService } from '../../services/job.service';

@Injectable({
  providedIn: 'root',
})
export class WaitingJobsResolver implements Resolve<Pagination<JobDetails>> {
  constructor(private jobs: JobService, private auth: AuthService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<JobDetails>> {
    let isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );

    if (isAdmin) {
      return this.jobs.getAllWaitingApproveByMain(1, 10);
    } else {
      return this.jobs.getAllWaitingApproveByBranch(1, 10);
    }
  }
}

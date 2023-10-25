import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { LookupService } from 'projects/tools/src/public-api';
import { BranchesService } from '../../services/branches.service';
import { SecurityCompanyUserService } from '../../services/security-company-user.service';

@Injectable({
  providedIn: 'root',
})
export class BranchUsersResolver implements Resolve<any> {
  constructor(
    private users: SecurityCompanyUserService,
    private branches: BranchesService,
    private lookups: LookupService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let users$ = this.users.getAllByBranchId(route.params['id']);
    let branch$ = this.branches.getBranchById(route.params['id']);
    let $bloodType = this.lookups.getBloodType();
    let $gender = this.lookups.getGender();
    let $jobType = this.lookups.getJobType();
    let $nationality = this.lookups.getNationality();
    let countries$ = this.lookups.getCountriesCodes();
    return combineLatest([
      branch$,
      users$,
      $bloodType,
      $gender,
      $jobType,
      $nationality,
      countries$,
    ]).pipe(
      map((res) => {
        return {
          branch: res[0],
          users: res[1],
          bloodType: res[2],
          gender: res[3],
          jobType: res[4],
          nationality: res[5],
          countries: res[6],
        };
      })
    );
  }
}

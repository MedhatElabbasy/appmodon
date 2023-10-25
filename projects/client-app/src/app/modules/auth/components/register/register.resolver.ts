import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of, take } from 'rxjs';
import { Lookup, LookupService } from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class RegisterResolver
  implements
    Resolve<{
      bloodType: Lookup[];
      gender: Lookup[];
      jobType: Lookup[];
      nationality: Lookup[];
    }>
{
  constructor(private lookups: LookupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    bloodType: Lookup[];
    gender: Lookup[];
    jobType: Lookup[];
    nationality: Lookup[];
  }> {
    let $bloodType = this.lookups.getBloodType();
    let $gender = this.lookups.getGender();
    let $jobType = this.lookups.getJobType();
    let $nationality = this.lookups.getNationality();

    return combineLatest([$bloodType, $gender, $jobType, $nationality]).pipe(
      take(1),
      map((res) => {
        return {
          bloodType: res[0],
          gender: res[1],
          jobType: res[2],
          nationality: res[3],
        };
      })
    );
  }
}

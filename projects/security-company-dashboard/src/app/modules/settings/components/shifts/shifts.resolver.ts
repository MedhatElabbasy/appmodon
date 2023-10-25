import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { LookupService } from 'projects/tools/src/public-api';
import { ShiftsService } from '../../services/shifts.service';

@Injectable({
  providedIn: 'root',
})
export class ShiftsResolver implements Resolve<any> {
  constructor(private shifts: ShiftsService, private lookups: LookupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let shiftsTypes$ = this.lookups.getShiftType();
    let shifts$ = this.shifts.getAll(1, 10);
    return combineLatest([shiftsTypes$, shifts$]).pipe(
      map((res) => ({ types: res[0], shifts: res[1] }))
    );
  }
}

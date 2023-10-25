import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import {
  Lookup,
  LookupService,
  OptionSet,
  OptionSetEnum,
  OptionSetItem,
  OptionSetService,
} from 'projects/tools/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class RequestQuotaResolver
  implements Resolve<{ contractTypes: OptionSet; shifts: Lookup[] }>
{
  constructor(
    private lookup: LookupService,
    private options: OptionSetService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ contractTypes: OptionSet; shifts: Lookup[] }> {
    let types$ = this.options.getOptionSetByName(OptionSetEnum.ContractType);
    let shifts$ = this.lookup.getShiftType();

    return combineLatest([types$, shifts$]).pipe(
      map((response) => {
        return {
          contractTypes: response[0],
          shifts: response[1],
        };
      })
    );
  }
}

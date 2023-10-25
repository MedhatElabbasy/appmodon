import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagination } from 'projects/tools/src/public-api';
import { Contract } from '../../models/contracts';
import { ContractsService } from '../../services/contracts.service';

@Injectable({
  providedIn: 'root',
})
export class SuspendedContractsResolver
  implements Resolve<Pagination<Contract>>
{
  constructor(private contracts: ContractsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Pagination<Contract>> {
    return this.contracts.getSuspendedContracts(1, 10);
  }
}

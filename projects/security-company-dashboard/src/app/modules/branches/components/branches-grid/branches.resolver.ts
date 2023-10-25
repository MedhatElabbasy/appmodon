import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Branch } from '../../models/branch';
import { BranchesService } from '../../services/branches.service';

@Injectable({
  providedIn: 'root',
})
export class BranchesResolver implements Resolve<Branch[]> {
  constructor(private branches: BranchesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Branch[]> {
    return this.branches.getAllByCompanyId();
  }
}

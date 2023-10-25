import { ClientBranch } from './../../models/client-branch';
import { ClientBranchesService } from './../../services/client-branches.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientBranchesResolver implements Resolve<ClientBranch[]> {
  constructor(private clientBranchService: ClientBranchesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClientBranch[]> {
    return this.clientBranchService.getAllBranches();
  }
}

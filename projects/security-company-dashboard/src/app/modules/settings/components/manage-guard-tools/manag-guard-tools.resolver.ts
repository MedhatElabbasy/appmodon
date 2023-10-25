import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { companyEquipment } from '../../models/companyEquipment';
import { ManageGuardToolsService } from '../../services/manage-guard-tools.service';

@Injectable({
  providedIn: 'root',
})
export class ManagGuardToolsResolver implements Resolve<any> {
  constructor(private _ManageGuardToolsService: ManageGuardToolsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let equipments$ = this._ManageGuardToolsService.getAll();

    return equipments$;
  }
}

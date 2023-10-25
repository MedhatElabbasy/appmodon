import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { OfferDetailsService } from '../../services/offer-details.service';

@Injectable({
  providedIn: 'root'
})
export class OfferDetailsResolver implements Resolve<boolean> {
  constructor(private offerServices: OfferDetailsService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.params['id']
    return this.offerServices?.getOffer(id).pipe(
      catchError(error => {
 
        return of('No data');
      })
    )
  }
}

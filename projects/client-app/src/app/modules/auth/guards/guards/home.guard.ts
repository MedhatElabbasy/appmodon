import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Routing } from '../../../core/routes/app-routes';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private auth: AuthService , private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.userInfo.pipe(
        take(1),
        map((user) => {
          console.log(user);

          
          
          if (!!user) {
            console.log("true");
            this.router.navigate([`/${Routing.dashboad.module}/${Routing.dashboad.children.dashboad}`]);
            return true;
          } else {
            console.log("false");
            return false;
          }

          
        })
      );
  }
  
}

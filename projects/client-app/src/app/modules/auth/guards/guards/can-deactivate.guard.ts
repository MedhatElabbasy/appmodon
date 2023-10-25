import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Routing } from '../../../core/routes/app-routes';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanActivate {
  constructor(private auth: AuthService , private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.userInfo.pipe(
        take(1),
        map((user) => {
          console.log(user);
          if (!!user) {
            console.log("false");
            return false;
          } else {
            console.log("true");
            this.router.navigate([`/${Routing.dashboad.module}/${Routing.dashboad.children.dashboad}`]);
            return true;
          }
        })
      );
  }
  
}

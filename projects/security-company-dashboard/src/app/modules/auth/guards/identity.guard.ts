import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Routing } from '../../core/routes/app-routes';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.userIdentity.pipe(
      take(1),
      map((user) => {
        if (user?.isProfileComplete) {
          return true;
        } else {
          let url = `/${Routing.auth.module}/${Routing.auth.children.register}`;
          return this.router.createUrlTree([url]);
        }
      })
    );
  }
}

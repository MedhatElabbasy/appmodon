import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Routing } from '../routes/app-routes';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
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
      map((user) => {
        if (user?.role) {
          let allowedRoles: string[] = route.data['allowedRoles'];
          let allowed = allowedRoles.includes(user.role);

          // check if at least one role allowed
          if (allowed) {
            return true;
          } else {
            return this.router.createUrlTree(['/' + Routing.unauthorized]);
          }
        } else {
          return this.router.createUrlTree(['/' + Routing.unauthorized]);
        }
      })
    );
  }
}

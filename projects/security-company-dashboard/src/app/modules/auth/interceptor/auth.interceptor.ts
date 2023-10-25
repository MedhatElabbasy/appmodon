import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.auth.userIdentity.pipe(
      take(1),
      exhaustMap((user) => {
        if (user) {
          let modified = request.clone({
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + user.token,
            }),
          });

          return next.handle(modified);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}

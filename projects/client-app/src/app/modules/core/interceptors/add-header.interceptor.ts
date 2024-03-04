import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = req.clone({ 
      headers: req.headers.set('App', 'client-app').set('plateForm','web')
    });
    console.log(modifiedReq);
    return next.handle(modifiedReq);
  }
}

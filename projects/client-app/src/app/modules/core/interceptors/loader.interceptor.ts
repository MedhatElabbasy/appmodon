import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from 'projects/tools/src/public-api';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    console.log(req);
    
    if (!req.url.includes('Notification') && !req.url.includes('GetAllApprovedSearch')&& !req.url.includes('SecuritySupervisorHub')) {
      this.loaderService.isLoading.next(true);
    }

    return new Observable((observer) => {
      const subscription = next.handle(req).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        error: (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        complete: () => {
          this.removeRequest(req);
          observer.complete();
        },
      });

      // Remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
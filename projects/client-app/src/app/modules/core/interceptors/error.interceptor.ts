import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { language, StorageKeys } from 'projects/tools/src/public-api';
import { ErrorService } from 'projects/tools/src/lib/services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  errorMessage: string = ' '
  constructor(private messageServices: MessageService, private _ErrorService: ErrorService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (request.url.includes('uploadFormFile')) {
          let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
          this.errorMessage = lang == 'ar' ? 'هذا الملف اكبر من 2 ميجا بايت لا يمكن رفعه' : "this file size greater than 2 mb can't upload"
          const message = this.setError(error);
        }
       if (!request.url.includes('otp')) {
          const message = this.setError(error);

          /*let lang = localStorage.getItem(StorageKeys.lang)!;
           this.messageServices.add({
            key: lang === language.ar ? 'tl' : 'tr',
            severity: 'error',
            summary: 'Error',
            detail: message,
          });*/
        }

        return throwError(() => error.error);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    console.log(this.errorMessage);

    if (this.errorMessage == '') {
      this.errorMessage = 'Unknown error occurred';
    }
    if (error.error instanceof ErrorEvent) {
      // Client side error
      this.errorMessage = error.error.message;
    } else {
      // server side error
      let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
      if (error.status !== 0) {
        let message = lang == 'ar' ? 'حدث خطأ ما' : 'An Error Accrued';
        if (error.status == 500) {
          this.errorMessage = this.errorMessage;
        } else {
          if (error.error) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = message;
          }
        }
      } else {
        this.errorMessage
      }
    }
    this._ErrorService.error.next(this.errorMessage);
    return this.errorMessage;
  }
}
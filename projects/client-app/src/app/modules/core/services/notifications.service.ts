import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly url = environment.api;

  constructor(private http: HttpClient) { }


  clientNotification(clientID: number, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + `api/Notification/GetAllForSecurityClientCompanyId?ClientCompanyId=${clientID}&page=${pageNumber}&pageSize=${pageSize}`)
  }

  guardNotification(guardID: number, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + `api/Notification/GetAllByCompanySecurityGuardId?CompanySecurityGuardId=${guardID}&page=${pageNumber}&pageSize=${pageSize}`)
  }
  addNotify(data: any) {
    data.highlightWords = ''
    data.highlightWordsEn = ''
    data.paramters = ''
    data.notificationType = 1
    return this.http.post(this.url + `api/Notification/Create`, data ,  {
      headers: {
        loader: 'true',
      },
    })
  }

}

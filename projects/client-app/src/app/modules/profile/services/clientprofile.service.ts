import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class checkclientprofile {
  private readonly url = environment.api;

  model = new BehaviorSubject(null)

  constructor(private http: HttpClient) {}

  checkClientProfile(id :number) {
    return this.http.get(
      this.url + `api/CompanyProfile/CheckIsClientProfileComplete?id=${id}`,
    );
  }

}
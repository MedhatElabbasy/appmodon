import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { SecurityGuard } from '../../auth/models/security-guard.model';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}

  update(model: SecurityGuard) {
    return this.http.post<SecurityGuard>(
      this.url + `api/SecurityGuard/Update`,
      model
    );
  }
}

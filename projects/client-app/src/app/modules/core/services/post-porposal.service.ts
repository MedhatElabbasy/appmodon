import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostPorposalService {
  private readonly url = environment.api;
  constructor(private http: HttpClient) {}
  addPorposal(data: FormGroup): Observable<any> {
    return this.http.post(`${this.url}api/Suggestion/Add`, data.value);
  }
}

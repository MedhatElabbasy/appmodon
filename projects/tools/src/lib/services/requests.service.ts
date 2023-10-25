import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ClientOrder } from '../models/client-orders';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private url!: string;
  constructor(private http: HttpClient, @Inject('env') private env: any) {
    this.url = env.api;
  }

  add(model: any) {
    return this.http.post(this.url + `api/ClientOrder/Add`, model);
  }

  getAllByClientCompany(id: number) {
    return this.http.get<ClientOrder[]>(
      this.url + `api/ClientOrder/GetAllByClientCompnay?ClientCompanyId=${id}`
    );
  }

  getAllBySecurityCompany(id: number) {
    return this.http.get<ClientOrder[]>(
      this.url +
        `api/ClientOrder/GetAllBySecurityCompnay?SecurityCompanyId=${id}`
    );
  }
}

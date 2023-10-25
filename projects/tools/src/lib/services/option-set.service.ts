import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OptionSet, OptionSetItem } from '../models/option-set';

@Injectable({
  providedIn: 'root',
})
export class OptionSetService {
  private url!: string;

  constructor(private http: HttpClient, @Inject('env') private env: any) {
    this.url = env.api;
  }

  getOptionSetById(id: string) {
    return this.http.get<OptionSetItem[]>(
      this.url + `api/OptionSetItems/GetAll?id=${id}`
    );
  }

  getOptionSetByName(name: string) {
    return this.http.get<OptionSet>(
      this.url + `api/OptionSet/GetByName?name=${name}`
    );
  }
}

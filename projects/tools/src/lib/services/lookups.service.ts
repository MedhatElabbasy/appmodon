import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupNames } from '../enums/lookups-names.enum';
import { CountryCode } from '../models/country';
import { Lookup } from '../models/lookup';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private url!: string;

  constructor(private http: HttpClient, @Inject('env') private env: any) {
    this.url = env.api;
  }

  postGuradForm(Form: object): Observable<any> {
    return this.http.post(this.url + `api/SecurityGuard/CreateOld`, Form);
  }

  getNationality(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.nationality}`
    );
  }
  getCountries(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.country}`
    );
  }
  getBloodType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.bloodType}`
    );
  }

  getCity(nationalityId?: string): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.city}${
          nationalityId ? `&id=${nationalityId}` : ''
        }`
    );
  }

  getGender(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.gender}`
    );
  }

  getJobType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.jobType}`
    );
  }

  getAreas(cityId: string): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.area}&id=${cityId}`
    );
  }

  getAvailableServices(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.availableServices}`
    );
  }

  getCompanyScale(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.companyScale}`
    );
  }

  getFinanceYear(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.financeYear}`
    );
  }

  getTimeZone(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.timeZone}`
    );
  }

  getCountriesCodes(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>(this.url + `api/Country/GetAllCountry`);
  }

  getCompanyType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.companyType}`
    );
  }

  getCompanyGetAll():Observable<Lookup[]>{
    return this.http.get<Lookup[]>(
      this.url +
        `api/CompanyType/GetAll`
    );
  }

  getBusinessTypes() {
    return this.http.get<Lookup[]>(this.url + `api/BusinessType/GetAll`);
  }

  getShiftType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.shiftType}`
    );
  }
  getTimeType(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(
      this.url +
        `api/Lookup/public/lookup/getLookup?lookupName=${LookupNames.timeType}`
    );
  }


}

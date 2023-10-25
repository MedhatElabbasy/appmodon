import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client-app/src/environments/environment';
import { Lookup } from 'projects/tools/src/public-api';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateclientprofileService {

  private readonly url = environment.api;
  stepNumber = new BehaviorSubject<number>(0);
 
  
  constructor(private http: HttpClient, private auth: AuthService) {
    this.stepNumber.next(0);
    console.log(this.stepNumber);
  }

  completeClientCompany(data:any){
return this.http.post(this.url+`api/CompanyProfile/AddClientProfile`,data)
  }

  getCompanyGetAll():Observable<Lookup[]>{
    return this.http.get<Lookup[]>(
      this.url +
        `api/CompanyType/GetAll`
    );
  }
  
  getCityGetAll():Observable<Lookup[]>{
    return this.http.get<Lookup[]>(
      this.url +
        `api/City/GetAll`
    );
  }

  getNationalityAll():Observable<Lookup[]>{
    return this.http.get<Lookup[]>(
      this.url +
        `api/Nationality/GetAll`
    );
  }

}

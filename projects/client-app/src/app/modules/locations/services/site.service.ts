import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/client-app/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private readonly url = environment.api;
  constructor(private http: HttpClient, private auth: AuthService) { }
  getAllClientSites(clientID : string){
    return this.http.get(this.url +`api/ClientSite/GetAllByClientId?id=${clientID}`)
  }
  GetAllByClientId(clientID : number){
    return this.http.get(this.url +`api/SecurityCompanyClients/GetAllByClientId?ClientId=${clientID}&page=1&pageSize=1000`)
  }

 GetAllByClientIdSecurityCompanyBranch(clientId:string , securityCompanyBranchId:string){
  return this.http.get(this.url +`api/ClientSite/GetAllByClientIdSecurityCompanyBranch?id=${clientId}&SecurityCompanyBranch=${securityCompanyBranchId}`)
 }

GetAllByBranchId(BranchId:string){
  return this.http.get(this.url +`api/SecurityCompanyClients/GetAllByBranchId?BranchId=${BranchId}&page=1&pageSize=1000`)
 
}

}

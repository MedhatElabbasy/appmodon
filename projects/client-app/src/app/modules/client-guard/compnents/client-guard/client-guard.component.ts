import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientSite } from '../../../locations/models/sites';
import { CompaniesService } from 'projects/client-app/src/app/pages/companies/companies.service';
import { Routing } from '../../../core/routes/app-routes';
import { SiteService } from '../../../locations/services/site.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Roles } from 'projects/tools/src/public-api';
//import { ClientSite } from 'src/app/modules/accident/models/accident';
//import { Routing } from 'src/app/modules/core/routes/app-routes';
//import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

@Component({
  selector: 'app-client-guard',
  templateUrl: './client-guard.component.html',
  styleUrls: ['./client-guard.component.scss']
})
export class ClientGuardComponent implements OnInit {

   sites!:ClientSite[]|any
   ClientId:any;
  constructor(private site:SiteService , private route: ActivatedRoute ,private auth: AuthService,  private router: Router, ) {
    console.log("dina");

  }

  ngOnInit(): void {

    this.getData()
   // console.log(this.locationLink);

  }



  getData(){


    let user = this.auth.snapshot.userIdentity;
     this.ClientId = this.route.snapshot.params['id'];
    if (user?.roles.includes(Roles.Company)) {

    console.log(this.ClientId);

    // this.site.GetAllByClientId(id).subscribe((res:any)=>{
    //   if(res){
    //     console.log(res);

        this.site.getAllClientSites(this.ClientId).subscribe((res:any)=>{
          this.sites=res;
          console.log(this.sites);

      //   })
      // }
    })
  }else{
    console.log(this.auth.snapshot.userInfo);

    this.auth.userInfo.subscribe((res:any) => {
if(res){
  if(!res.clientCompanyBranch.isMainBranch){

    console.log(res);
    // this.site.GetAllByClientId(res.clientCompanyBranch.clientCompanyId).subscribe((response:any)=>{
    //   if(response){
    //     console.log(response);

    //     let data=response.data[0]
    //     console.log(data);
        this.site.GetAllByClientIdSecurityCompanyBranch( this.ClientId,
          res.clientCompanyBranch.securityCompanyBranchId).subscribe((result)=>{
          console.log(result);
          this.sites=result;
         })




  }
  else if(res.clientCompanyBranch.isMainBranch){
    // this.site.GetAllByClientId(res.clientCompany.id).subscribe((res:any)=>{
    //   if(res){
    //     console.log(res);

        this.site.getAllClientSites(this.ClientId).subscribe((res:any)=>{
          this.sites=res;
          console.log(this.sites);

      //   })
      // }
    })
  }

}
    });
  }
  }

  Redirect(id:any , numberofGuards:number){
    console.log(id);

    this.router.navigate([
      `/${Routing.clientGuard.module}/${Routing.clientGuard.children.clientGurad}/${this.ClientId}/${Routing.clientGuard.children.guardCard}`,id
    ]);
  }


}

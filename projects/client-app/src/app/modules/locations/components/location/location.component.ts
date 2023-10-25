import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientSite } from '../../models/sites';
import { SiteService } from '../../services/site.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Roles } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  allCompanies: any[] = [];
  id!: any;
  sites!: ClientSite[] | any;
  constructor(
    private site: SiteService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let user = this.auth.snapshot.userIdentity;

    if (user?.roles.includes(Roles.Company)) {
      this.id = this.auth.snapshot.userInfo?.id;
      console.log(this.id);
      if (this.id) {
        this.site.GetAllByClientId(this.id).subscribe((res: any) => {
          if (res) {
            this.allCompanies = res.data;
            console.log(this.allCompanies);
            // this.site.getAllClientSites(res.data[0].id).subscribe((res:any)=>{
            //   this.sites=res;
            //   console.log(this.sites);

            // })
          }
        });
      }
    } else {
      console.log(this.auth.snapshot.userInfo);

      this.auth.userInfo.subscribe((res: any) => {
        console.log(res);
        if(!res.clientCompanyBranch.isMainBranch){
          this.site.GetAllByClientId(res.clientCompanyBranch.clientCompanyId)
          .subscribe((response: any) => {
            if (response) {
              console.log(response);
              
              this.allCompanies = response.data;
              console.log(this.allCompanies);
            }
          });
        }
        else if(res.clientCompanyBranch.isMainBranch){
        this.site
          .GetAllByClientId(res.clientCompanyBranch.clientCompanyId)
          .subscribe((response: any) => {
            if (response) {
              console.log(response);
              
              this.allCompanies = response.data;
              console.log(this.allCompanies);
            
              // this.site
              //   .GetAllByClientIdSecurityCompanyBranch(
              //     response.data[0].id,
              //     res.clientCompanyBranch.securityCompanyBranchId
              //   )
              //   .subscribe((result) => {
              //     console.log(result);
              //     this.sites = result;
              //   });
            }
          });
        }
      });
    }
  }
  AllBranches(data: any) {
    console.log(data);
    if(this.router.url.includes('/locations/location')){
      this.router.navigate([`/locations/allBranches/${data.id}`]);
    }else{
      this.router.navigate([`/client-guard/client-guard/${data.id}`]);
    }
    
  }
}

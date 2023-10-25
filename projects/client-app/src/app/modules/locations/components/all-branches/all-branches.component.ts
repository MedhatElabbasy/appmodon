import { Component, OnInit } from '@angular/core';
import { ClientSite } from '../../models/sites';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-all-branches',
  templateUrl: './all-branches.component.html',
  styleUrls: ['./all-branches.component.scss'],
})
export class AllBranchesComponent implements OnInit {
  sites!: ClientSite[] | any;

  constructor(private route: ActivatedRoute, private site: SiteService , private auth: AuthService) {

    let user = this.auth.snapshot.userIdentity;
    let id = this.route.snapshot.params['id'];
     console.log(id);
    if (user?.roles.includes(Roles.Company)) {
    this.site.getAllClientSites(id).subscribe((res: any) => {
      this.sites = res;
    });

  }else{
    this.auth.userInfo.subscribe((res: any) => {
      if(res){
      console.log(res);

      if(!res.clientCompanyBranch.isMainBranch){
        this.site
        .GetAllByClientIdSecurityCompanyBranch(
          id,
          res.clientCompanyBranch.securityCompanyBranchId
        )
        .subscribe((result) => {
          console.log(result);
          this.sites = result;
        });
      }else if(res.clientCompanyBranch.isMainBranch){
        this.site.getAllClientSites(id).subscribe((res: any) => {
          this.sites = res;
        });

      }
    
       
              }
    });
  }
  }

  ngOnInit(): void {}
}

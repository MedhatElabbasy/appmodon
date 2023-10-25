import { CryptoService } from './../../../../../../../../../tools/src/lib/services/crypto.service';
import { CompanySecurityGuard } from './../../../../../client/models/site-details';
import { ApprovedStatus } from './../../../../../../../../../tools/src/lib/enums/option-set.enum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangService, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { GuardLeaves } from '../../../../models/guard-leaves';
import { CompanyGuardsService } from '../../../../services/company-guards.service';

@Component({
  selector: 'app-guard-leaves',
  templateUrl: './guard-leaves.component.html',
  styleUrls: ['./guard-leaves.component.scss'],
})
export class GuardLeavesComponent implements OnInit {
  leaves: GuardLeaves[] = [];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  status = ApprovedStatus;
  guard!: CompanySecurityGuard

  constructor(private route: ActivatedRoute, public lang: LangService, private companyService: CompanyGuardsService, private crypto: CryptoService) {
    let encryptedGuard = this.route.parent?.snapshot.params['guard'];
    this.guard = JSON.parse(
      this.crypto.decrypt(encryptedGuard)
    );
  }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.leaves = res['leaves'];
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  approve(id: string) { 
    this.companyService.acceptRequest(id).subscribe(()=> this.getRequests())
   }

  reject(id: string){
    this.companyService.rejectRequest(id).subscribe(()=> this.getRequests())
  }

  getRequests(){
    this.companyService.
    getLeavesByCompanyGuardId(this.guard.id).subscribe((res)=>{
      this.leaves = res
    })
  }
}

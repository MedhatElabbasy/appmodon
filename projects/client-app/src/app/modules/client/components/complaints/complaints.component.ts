import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService, Pagination, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { RasdInfraction } from '../../models/RasdInfraction';
import { ComplaintsService } from '../../services/complaints.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
})
export class ComplaintsComponent implements OnInit {
  id: number = 0;
  allComplaints: any;
  allCompanies: any;
  status: string = '';
  arrangment: string = '';
  Complaints!: Pagination<RasdInfraction>;
  searchKey = '';
  pageSize = 10;
  pageNumber = 1;
  total!: number;
  sizes = [5, 10, 20, 30];
  user: any;
  role: any;
  constructor(
    private _ComplaintsService: ComplaintsService,
    private _AuthService: AuthService,
    public lang: LangService,
    public router: Router
  ) {
    this.getUserRole();
  }
  ngOnInit(): void {}

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.getAll();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.getAll();
  }

  filter1() {
    this.status = 'accepted';

    this.getAll();
  }
  filter2() {
    this.status = 'rejected';

    this.getAll();
  }
  filter3() {
    this.status = 'under review';

    this.getAll();
  }
  ascending() {
    this.arrangment = 'ascending';

    this.getAll();
  }
  descending() {
    this.arrangment = 'descending';

    this.getAll();
  }
  getUserRole() {
    this._AuthService.userInfo.subscribe((user) => {
      this.user = user;
      console.log(this.user);

    if (user) {
      this.role = this._AuthService.snapshot.userIdentity?.role;
      console.log(this.role);
      if (this.role == Roles.Company) {
        this._AuthService.getUser().subscribe((response) => {
          this.id = response.id;
          this._ComplaintsService
          .getAll(this.pageNumber, this.pageSize,this.id)
          .subscribe((res) => {
            this.allComplaints = res.data;
            this.getAll();
          });
          
        });
      }else{
      //   if(this.user.clientCompanyBranchId != null){
      //     this.id = this.user.clientCompanyBranchId;
      //     console.log(this.id);
      //   this._ComplaintsService.getAllClientUser(this.pageNumber, this.pageSize,this.id).subscribe((res)=>{
      //     console.log(res);
      //     this.allComplaints = res.data;
      //     this.getAll();
      //   })
      // }else{
      //   this.id = this.user.appUserId;
      //   this._ComplaintsService.getAllClientUser(this.pageNumber, this.pageSize,this.id).subscribe((res)=>{
      //     console.log(res);
      //     this.allComplaints = res.data;
      //     this.getAll();})
      // }
      if(!user.clientCompanyBranch.isMainBranch){}
      else if(user.clientCompanyBranch.isMainBranch){
        this._ComplaintsService
          .getAll(this.pageNumber, this.pageSize,user.clientCompanyBranch.clientCompanyId)
          .subscribe((res) => {
            this.allComplaints = res.data;
            this.getAll();
          });
      }
      
}
    }
  });
}
  getAll() {
    console.log(this.allComplaints);

    if (this.status == '') {
      this.allComplaints;
    } else if (this.status == 'accepted') {
      let all = this.allComplaints.filter((element: any) => {
        return element.infractionStatus.nameEn == 'accepted';
      });
      this.allComplaints = all;
    } else if (this.status == 'rejected') {
      let all = this.allComplaints.filter((element: any) => {
        return element.infractionStatus.nameEn == 'rejected';
      });
      this.allComplaints = all;
    } else {
      let all = this.allComplaints.filter((element: any) => {
        return (
          element.infractionStatus.nameEn != 'rejected' &&
          element.infractionStatus.nameEn != 'accepted'
        );
      });
      this.allComplaints = all;
    }
    if (this.arrangment == 'ascending') {
      this.allComplaints.sort((a: any, b: any) =>
        a.created < b.created ? -1 : 1
      );
    } else {
      this.allComplaints.sort((a: any, b: any) =>
        a.created > b.created ? -1 : 1
      );
    }
  }
  Details(value: number) {
    this.router.navigate(['/infraction-Details']);
  }
}

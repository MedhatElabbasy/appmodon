import { Component, OnInit } from '@angular/core';
import { LangService, Pagination } from 'projects/tools/src/public-api';
import { RasdInfraction } from '../../model/RasdInfraction';
import { ComplaintsService } from '../../services/complaints.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';

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
  sizes = [5, 10, 20, 30];
  constructor(
    private _ComplaintsService: ComplaintsService,
    private _AuthService: AuthService,
    public lang: LangService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

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

  getAll() {
    this._AuthService.getSecurityCompany().subscribe((response) => {
      this.id = response.id;
      this._ComplaintsService
        .getAll(this.pageNumber, this.pageSize,this.id)
        .subscribe((res) => {
          this.allComplaints = res.data;
       
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
        });
    });
  }
  Details(value: number) {
    this.router.navigate(['/infraction-Details']);
  }
}

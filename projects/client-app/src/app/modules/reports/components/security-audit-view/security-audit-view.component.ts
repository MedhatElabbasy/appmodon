import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { LangService, PAGINATION_SIZES, Roles, language } from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { ReportsService } from '../../services/reports.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-security-audit-view',
  templateUrl: './security-audit-view.component.html',
  styleUrls: ['./security-audit-view.component.scss']
})
export class SecurityAuditViewComponent implements OnInit {
  id!: number;
  delete!: boolean;
  data: any;
  filter: boolean = false;
  clientData!: any[];
  clientFilter: boolean = false;
  maxDate = new Date();
  searchKey = '';
  visitorsReport!: any[];
  allData!:any;
  clientID!:any;
  date = new FormControl(new Date());
  securityAudit!:any;
  pageNumber = 1;
  pageSize = 10;
  sizes = [...PAGINATION_SIZES];
  constructor(public lang: LangService,private localeService: BsLocaleService ,
     private _router: Router , private _reports:ReportsService , private auth: AuthService) {
      this.getInfo();
      this.getAllData();
      }

  ngOnInit(): void {
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }


  initDatePiker() {
    defineLocale('ar', arLocale);
    defineLocale('en', enGbLocale);
    this.lang.language.subscribe((res) => {
      res === language.ar
        ? this.localeService.use('ar')
        : this.localeService.use('en');
    });
  }

  getDataFilter(filter: string) {
    this.filter = true;
    this.clientFilter = false;
    this.data = null;
    if (filter == 'client') {
      this.clientFilter = true;
    }
  }
  getTextParts(inputText: string): string[] {
    // Split the text at the '$' character
    return inputText.split('$');
  }
  
  displayFilter(event: any) {
    this.id = event.value;
    this.delete = false;
    //this.getReports();
  }
  deleteFilter() {
    this.filter = false;
    this.clientFilter = false;
    this.data = null;
    this.delete = true;
   // this.getReports();
  }


  getInfo(){
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.clientID = this.auth.snapshot.userInfo?.id
      console.log(this.clientID);
      
    } else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          console.log(res);
          if (!res.clientCompanyBranch.isMainBranch) {
            this.clientID = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            this.clientID = this.auth.snapshot.userInfo?.clientCompanyId
          }
        }
      })
    }
  }

  getAllData(){
  this._reports.GetSecurityAuditFormByClientCompanyID(this.clientID).subscribe((res)=>{
    console.log(res);
    this.securityAudit=res;
    this.allData = res;
  })
  }

  search() {
    console.log(this.allData);
    this.securityAudit = this.allData
    let myData:any[] =[];
    if (this.searchKey != '') {
      this.securityAudit.filter((ele: any) => {
        let name = ele.employeeName
        let city = ele.industrialCity

        if (
          name.includes(this.searchKey.replace(/\s/g, '')) || city.includes(this.searchKey.replace(/\s/g, ''))
        ) {
          myData.push(ele);
        }
      });
      this.securityAudit = myData;
    } else {


      this.securityAudit = this.allData;
    }
  }

 
  

  createNewRequest(){
    this._router.navigate([`/${Routing.reports.module}/${Routing.reports.children.securityAudit}`])
  }
}

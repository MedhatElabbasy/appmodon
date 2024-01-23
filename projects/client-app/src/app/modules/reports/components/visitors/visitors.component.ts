import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
//import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { map, Observable } from 'rxjs';
import {
  convertDateToString,
  LangService,
  language,
  PAGINATION_SIZES,
  Roles,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
//import { Loader } from '../../../core/enums/loader.enum';
import { VisitorsReport } from '../../models/visitors-report';
import { ReportsService } from '../../services/reports.service';
import { environment } from '../../../../../../src/environments/environment';
import { ngxCsv } from 'ngx-csv';
//import { ClientsService } from '../../../client/services/clients.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.scss'],
})
export class VisitorsComponent implements OnInit {
  private _hubConnection!: HubConnection;
  id!: number;
  delete!: boolean;
  data: any;
  filter: boolean = false;
  clientFilter: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  date = new FormControl(new Date());
  visitorsReport!: any[];
  allData!: any[];
  maxDate = new Date();
  searchKey = '';
  myEnv: any = environment
  dowenload: any[] = [];
  securityCompanyClientId!: any;
  newsecurityCompanyClientID!: string;
  clientID!: any;
  dateFilter: boolean = false;
  Sites!: any;
  locationId!: any;
  start!: any;
  yesterday!: Date;
  end!: any;
  branches!: any;
  branchId!: any;
  constructor(
    private reports: ReportsService,
    private auth: AuthService,
    public lang: LangService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private _reports: ReportsService
  ) {
    this.initDatePiker();

  }

  ngOnInit(): void {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);

    this.initDatePiker();
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res) => {
        this.clientID = res?.id
        this.connectHub();
        this.onDateChange();
        this.getAllReports();
      })
    } else {

      this.auth.userInfo.subscribe((res: any) => {
        if (res) {

          if (!res.clientCompanyBranch.isMainBranch) {
            this.clientID = res?.clientCompanyBranch.clientCompanyId
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            this.clientID = res?.clientCompanyId
          }
          this.connectHub();
          this.onDateChange();
          this.getAllReports();
        }
      })
    }
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAllReports();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getAllReports();
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

  connectHub() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.myEnv.hub)
      .build();

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.invoke(
          'AddToGroup',
          `${this.auth.snapshot.userInfo?.id}-visitors`
        );

        this._hubConnection.on('ReceiveMessage', () => {
          this.getAllReports();
        });
      })
      .catch((err) =>
        console.log('error while establishing signalr connection')
      );
  }

  getAllSites() {
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    this._reports.GlobalApiFilterGetAllSiteLocationByUserAndSCForUserClient(this.securityCompanyClientId, AppUserId).subscribe((res: any) => {
      this.Sites = res
    })
  }

  getClients() {
    if (this.clientID) {
      this._reports.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.clientID).subscribe((res) => {
        this.data = res;
        console.log(this.data);

      });
    }
  }





  getBySiteId({ value }: any) {
    this.locationId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
    this.getBranches()
  }


  selectSecurity({ value }: any) {
    console.log(value);
    this.locationId = []
    this.securityCompanyClientId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
    this.getAllSites();
  }

  deleteFilter() {
    this.filter = false;
    this.data = null
    this.Sites = null
    this.pageNumber = 1;
    this.pageSize = 5
    this.getAllReports();
  }


  onDateChange() {
    this.date.valueChanges
      .pipe(
        map((val: any) => ({
          start: convertDateToString(val[0]),
          end: convertDateToString(val[1]),

        }))
      )
      .subscribe((val) => {
        this.pageNumber = 1
        this.pageSize = 5
        this.getAllReports();
      });
    console.log(this.date);
  }

  getAllReports() {
    let date: any;
    // let start;
    // let end;
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    let model
    if (this.filter == false) {
      date = convertDateToString(new Date());
      this.start = date;
      this.end = date;
      this.securityCompanyClientId = []
      this.locationId = []
      this.branchId = []
    } else {
      date = this.date.value;
      this.start = convertDateToString(date[0]);
      this.end = convertDateToString(date[1]);
      if (this.clientFilter) {
        this.getClients();
      }
    }

    model = {
      "clientCompanyId": this.clientID,
      "appUserId": AppUserId,
      "securityCompanyClientList": this.securityCompanyClientId,
      "securityCompanyBranchList": this.branchId,
      "clientSitesList": this.locationId,
      "startDate": this.start,
      "endDate": this.end,
      "page": this.pageNumber,
      "pageSize": this.pageSize,
      "searchKeyWord": this.searchKey
    }
    this.reports.VisitorReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      this.visitorsReport = res.data
      this.total = res.totalCount;
    })
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
  }



  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'My Report',
    useBom: true,
    noDownload: false,
    headers: [
      'أسم الزائر',
      '	رقم الجوال',
      'أسم الموقع',
      'اسم المضيف',
      'نوع الزيارة',
      'سبب الزيارة',
      'الحارس المسؤول	',
      'مشرف الأمن',
      'ملاحظات',
    ],
  };
  getData() {
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    let model = {
      "clientCompanyId": this.clientID,
      "appUserId": AppUserId,
      "securityCompanyClientList": this.securityCompanyClientId,
      "securityCompanyBranchList": [
      ],
      "clientSitesList": this.locationId,
      "startDate": this.start,
      "endDate": this.end,
      "page": 1,
      "pageSize": this.total,
      "searchKeyWord": this.searchKey
    }
    this.reports.VisitorReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      if (res) {
        this.allData = res.data;
        console.log(this.allData);
        this.dowenload = []
        for (let i = 0; i < this.allData.length; i++) {
          //   let incidentType = '';
          //   let reason = '';
          //   let isComplete = '';
          //   let totalWorkTime = '';
          //   let totalMustWorkTime = '';
          //   let toTalBreakTime = '';
          //   let totalExtraTime = '';
          //   if (this.report[i].incidentType) {
          //     incidentType = this.report[i].incidentType?.nameAr;
          //   } else {
          //     incidentType = 'لا يوجد';
          //   }
          //   if (this.report[i].reason) {
          //     reason = this.report[i].reason
          //   } else {
          //     reason = 'لا يوجد سبب';
          //   }
          //   if (this.report[i].isComplete) {
          //     isComplete = 'نعم';
          //   } else {
          //     isComplete = 'لا';
          //   }
          //   if (this.report[i].toTalBreakTime) {
          //     toTalBreakTime = this.report[i].toTalBreakTime;
          //   } else {
          //     toTalBreakTime = 'ليس في استراحة';
          //   }
          //   if (this.report[i].totalWorkTime) {
          //     totalWorkTime = this.report[i].totalWorkTime;
          //   } else {
          //     totalWorkTime = 'لا يوجد';
          //   }
          //   if (this.report[i].totalExtraTime) {
          //     totalExtraTime = this.report[i].totalExtraTime;
          //   } else {
          //     totalExtraTime = 'لم يتم العمل لوقت إضافي';
          //   }
          //   if (this.report[i].totalMustWorkTime) {
          //     totalMustWorkTime = this.report[i].totalMustWorkTime;
          //   } else {
          //     totalMustWorkTime = 'لا يوجد';
          //   }
          let field = {
            visitorName: this.allData[i].visitorName
              ? this.allData[i].visitorName
              : 'لا يوجد',


            phoneNumber: this.allData[i].vistorPhoneNumber ? this.allData[i].vistorPhoneNumber : 'لا يوجد',
            // phoneNumber:
            //   this.visitorsReport[i].companySecurityGuard.securityGuard?.appUser?.userName,
            siteLocationName: this.allData[i].siteLocation.name,


            hostName: this.allData[i].hostName
              ? this.allData[i].hostName
              : 'لا يوجد',


            visitType: this.allData[i].visitorType.nameAr
              ? this.allData[i].visitorType.nameAr + ' ' + this.allData[i].visitorType.nameEn
              : 'لا يوجد',


            vistorReason: this.allData[i].vistorReason
              ? this.allData[i].vistorReason
              : 'لا يوجد',


            securityGuard: this.allData[i]?.companySecurityGuard?.securityGuard?.firstName
              ? this.allData[i]?.companySecurityGuard?.securityGuard?.firstName +
              ' ' + this.allData[i]?.companySecurityGuard?.securityGuard?.middleName + ' ' +
              this.allData[i]?.companySecurityGuard?.securityGuard?.lastName
              : 'لا يوجد',


            siteSupervisorShift: this.allData[i].siteSupervisorShift.companySecurityGuard
              .securityGuard.firstName
              ? this.allData[i].siteSupervisorShift?.companySecurityGuard
                .securityGuard.firstName +
              ' ' + this.allData[i].siteSupervisorShift?.companySecurityGuard
                .securityGuard.middleName + ' ' +
              this.allData[i].siteSupervisorShift?.companySecurityGuard
                .securityGuard.lastName
              : 'لا يوجد',



            notes: (this.allData[i].notes) ?
              this.allData[i].notes : 'لا يوجد',
            // GuardCode: this.report[i].companySecurityGuard.securityGuard.id,
            // Name:
            //   this.report[i].companySecurityGuard.securityGuard.firstName +
            //   ' ' +
            //   this.report[i].companySecurityGuard.securityGuard.lastName,
            // phoneNumber:
            //   this.report[i].companySecurityGuard?.securityGuard?.appUser[
            //     'userName'
            //   ],
            // StartTime: this.report[i].startTime,
            // MustStart: this.report[i].mustStartDateTime,
            // incidentType: incidentType,
            // MustEndIn: this.report[i].mustEndDateTime,
            // breakComplete: reason,
            // isComplete: isComplete,
            // TotalWorkTime: totalWorkTime,
            // TotalBreakTime: toTalBreakTime,
            // TotalExtraTime: totalExtraTime,
            // TotalMustWorkTime: totalMustWorkTime,
            // TotalMustBreakTime: this.report[i].toTalMustBreakTime,
          };
          console.log(field);

          this.dowenload.push(field);
        }

        console.log(this.dowenload);

        this.downloadData(this.dowenload)
      }
    })
  }

  exportCSV() {
    this.getData();
    new ngxCsv(this.dowenload, 'My Report', this.options);
    this.dowenload = [];
  }

  // exportexcel(): void {
  //   // let fileName = 'guards.xlsx';

  //   // let element = document.getElementById('excel-table');
  //   // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //   // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   // XLSX.writeFile(wb, fileName);

  //   let fileName = 'guards.xlsx';

  //   let element = document.getElementById('excel-table');
  //   const ws: any = XLSX.utils.table_to_sheet(element);
  //   console.log(element);

  //   // Convert phone number column to string
  //   const range = XLSX.utils.decode_range(ws['!ref']);
  //   const phoneNumberColumnIndex = 2; // Assuming the phone number column is the third column (index 2)
  //   for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
  //     console.log(rowNum);

  //     const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: phoneNumberColumnIndex });
  //     const cell = ws[cellAddress];
  //     if (cell && cell.t === 'n') {
  //       cell.t = 's'; // Change the cell type to string
  //       cell.v = String(cell.v); // Convert the value to a string
  //     }

  //   }
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, fileName);
  // }

  downloadData(data: any[]) {
    console.log(data);

    // Create a workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert the workbook to an XLSX file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the file using FileSaver.js
    saveAs(blob, 'guardReport.xlsx');
  }


  search() {
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
  }

  getByBranchId({ value }: any) {
    this.branchId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
  }
  getDataFilter(filter: string) {
    this.filter = true;
    if (filter == 'branch') {
      this.clientFilter = true;
    } else if (filter == 'client') {
      this.clientFilter = true;
      // this.getClients();
    } else {
      this.dateFilter = true;
      this.clientFilter = false;
    }
  }
  getBranches() {
    if (this.clientID) {
      this._reports.GlobalApiFilterGetAllClientBranch(this.clientID).subscribe((res) => {
        this.branches = res;
        console.log(this.branches);

      });
    }
  }



}

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
  visitorsReport!: VisitorsReport[];
  allData!: VisitorsReport[];
  maxDate = new Date();
  searchKey = '';
  myEnv: any = environment
  dowenload: any[] = [];

  constructor(
    private reports: ReportsService,
    private auth: AuthService,
    public lang: LangService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private _reports: ReportsService
  ) {
    this.initDatePiker();
    this.connectHub();
  }

  ngOnInit(): void {
    this.onDateChange();
    this.route.data.subscribe((res) => {
      this.visitorsReport = res['report'];
    });
  }

  getVisitors(date: string) {
    // let isMain = this.auth.snapshot.userIdentity?.roles.includes(
    //   Roles.VirtualAdmin
    // );
    // console.log(isMain);

    //let report$: Observable<VisitorsReport[]>;
    // if (isMain) {
    let user = this.auth.snapshot.userIdentity;
    let clientID: any
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          this.reports.attendanceReportForClient(res.id, date).subscribe((res) => {
            console.log(res);
            this.visitorsReport = res;
            this.allData = res;
          });
        }
      });
    }
    else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          if (!res.clientCompanyBranch.isMainBranch) {
            this._reports.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
              this.reports.GetAllByClientAndBranchId(date, res2.securityCompanyBranchId).subscribe((res) => {
                console.log(res);
                this.visitorsReport = res;
                this.allData = res;
              })
            })
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            this.reports.attendanceReportForClient(res.clientCompany.id, date).subscribe((res) => {
              console.log(res);
              this.visitorsReport = res;
              this.allData = res;
            });
          }
        }
      });
    }
    // } else {
    //   report$ = this.reports.attendanceReportForBranch(date);
    // }


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
          this.getReports();
        });
      })
      .catch((err) =>
        console.log('error while establishing signalr connection')
      );
  }
  getAllSecurityCompanies() {
    let user = this.auth.snapshot.userIdentity;
    let clientID: any
    if (user?.roles.includes(Roles.Company)) {
      clientID = this.auth.snapshot.userInfo?.id
    } else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          console.log(res);
          if (!res.clientCompanyBranch.isMainBranch) {
            clientID = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            clientID = this.auth.snapshot.userInfo?.clientCompanyId
          }
        }
      })
    }

    if (clientID) {
      this._reports.getAllSecurityCompanyClients(clientID, 1, 20000).subscribe((res: any) => {
        this.data = res.data;
        console.log(this.data);

      });
    }
  }
  getReports() {
    let date = convertDateToString(this.date.value);
    if (this.delete) {
      date = convertDateToString(new Date());
    }
    if (!this.clientFilter) {
      this.getVisitors(date);
    } else {
      this.getVistorByClient();
    }
  }
  getVistorByClient() {
    this.visitorsReport = this.allData;
    let myData: VisitorsReport[] = [];
    this.visitorsReport.filter((ele: any) => {
      console.log(ele);

      if (
        ele.companySecurityGuard?.securityCompanyBranch.securityCompany.id == this.id
      ) {
        myData.push(ele);
      }
    });
    this.visitorsReport = myData;
  }
  getDataFilter(filter: string) {
    this.filter = true;
    this.clientFilter = false;
    this.data = null;
    if (filter == 'client') {
      this.clientFilter = true;
    }
  }
  displayFilter(event: any) {
    this.id = event.value;
    this.delete = false;
    this.getReports();
  }
  deleteFilter() {
    this.filter = false;
    this.clientFilter = false;
    this.data = null;
    this.delete = true;
    this.getReports();
  }
  onDateChange() {
    this.date.valueChanges
      .pipe(map((val) => convertDateToString(val)))
      .subscribe((val) => {
        this.getVisitors(val);
        if (this.clientFilter) {
          this.getAllSecurityCompanies();
        }
      });
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
    console.log(this.visitorsReport);
    this.dowenload=[]
    for (let i = 0; i < this.visitorsReport.length; i++) {
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
        visitorName: this.visitorsReport[i].visitorName
          ? this.visitorsReport[i].visitorName
          : 'لا يوجد',


        phoneNumber: this.visitorsReport[i].vistorPhoneNumber ? this.visitorsReport[i].vistorPhoneNumber : 'لا يوجد',
        // phoneNumber:
        //   this.visitorsReport[i].companySecurityGuard.securityGuard?.appUser?.userName,
        siteLocationName: this.visitorsReport[i].siteLocation.name,


        hostName: this.visitorsReport[i].hostName
          ? this.visitorsReport[i].hostName
          : 'لا يوجد',


        visitType: this.visitorsReport[i].visitorType.nameAr
          ? this.visitorsReport[i].visitorType.nameAr + ' ' + this.visitorsReport[i].visitorType.nameEn
          : 'لا يوجد',


        vistorReason: this.visitorsReport[i].vistorReason
          ? this.visitorsReport[i].vistorReason
          : 'لا يوجد',


      securityGuard: this.visitorsReport[i]?.companySecurityGuard?.securityGuard?.firstName
        ? this.visitorsReport[i]?.companySecurityGuard?.securityGuard?.firstName +
          ' ' +this.visitorsReport[i]?.companySecurityGuard?.securityGuard?.middleName+' '+
          this.visitorsReport[i]?.companySecurityGuard?.securityGuard?.lastName
          : 'لا يوجد',


      siteSupervisorShift: this.visitorsReport[i].siteSupervisorShift.companySecurityGuard
      .securityGuard.firstName
        ? this.visitorsReport[i].siteSupervisorShift?.companySecurityGuard
        .securityGuard.firstName +
          ' ' +this.visitorsReport[i].siteSupervisorShift?.companySecurityGuard
          .securityGuard.middleName+' '+
          this.visitorsReport[i].siteSupervisorShift?.companySecurityGuard
            .securityGuard.lastName
          : 'لا يوجد',



        notes: (this.visitorsReport[i].notes) ?
          this.visitorsReport[i].notes : 'لا يوجد',
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
    this.visitorsReport = this.allData
    let myData: VisitorsReport[] = [];
    if (this.searchKey != '') {
      this.visitorsReport.filter((ele: any) => {
        let name = ele.companySecurityGuard.securityGuard.firstName +
          ele.companySecurityGuard.securityGuard.middleName +
          ele.companySecurityGuard.securityGuard.lastName
        let vistorPhoneNumber = ele.vistorPhoneNumber
        let visitorName = ele.visitorName

        if (
          name.includes(this.searchKey.replace(/\s/g, '')) || vistorPhoneNumber.includes(this.searchKey.replace(/\s/g, '')) || visitorName.includes(this.searchKey.replace(/\s/g, ''))
        ) {
          myData.push(ele);
        }
      });
      this.visitorsReport = myData;
      console.log(this.visitorsReport);
      
    } else {
      this.visitorsReport = this.allData;
      console.log(this.visitorsReport);
    }
  }





}
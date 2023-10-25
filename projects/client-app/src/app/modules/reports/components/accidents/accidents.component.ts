import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
//import { environment } from 'projects/security-company-dashboard/src/environments/environment.staging';
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
import { Incident } from '../../models/incident';
import { ReportsService } from '../../services/reports.service';
import { environment } from '../../../../../environments/environment';
import { ngxCsv } from 'ngx-csv';
//import { ClientsService } from '../../../client/services/clients.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.scss'],
})
export class AccidentsComponent implements OnInit {
  private _hubConnection!: HubConnection;
  id!: string;
  delete!: boolean;
  data: any;
  filter: boolean = false;
  clientFilter: boolean = false;
  myFile!: any;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  date = new FormControl({ 0: new Date(), 1: new Date() });
  report!: Incident[];
  allData!: Incident[];
  maxDate = new Date();
  yesterday!: Date;
  display: boolean = false;
  selectedGallery!: any[];
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
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.initDatePiker();
    this.connectHub();
  }

  ngOnInit(): void {
    this.onDateChange();
    this.route.data.subscribe((res) => {
      this.report = res['report'];
      console.log(this.report);
    });
  }

  getIncident(startDate: string, endDate: string) {
    let user = this.auth.snapshot.userIdentity;
    let clientID: any
    if (user?.roles.includes(Roles.Company)) {
      clientID = this.auth.snapshot.userInfo?.id;
      if (clientID) {
        this.reports
          .getAllAccidentByClientCompany(clientID, startDate, endDate)
          ?.subscribe((res) => {
            this.report = res;
            this.allData = res;
            console.log(this.report);

          });
      }
    } else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          if (!res.clientCompanyBranch.isMainBranch) {
            this._reports.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
              this.reports.GetAllByClientCompanyAndDateAndBranchId(startDate, endDate, res2.securityCompanyBranchId)
                ?.subscribe((res) => {
                  this.report = res;
                  this.allData = res;
                  console.log(this.report);

                });
            })
          } else if (res.clientCompanyBranch.isMainBranch) {
            this.reports
              .getAllAccidentByClientCompany(res.clientCompany.id, startDate, endDate)
              ?.subscribe((res) => {
                this.report = res;
                this.allData = res;
                console.log(this.report);

              });
          }

        }
      })
    }
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
          `${this.auth.snapshot.userInfo?.id}-incident`
        );

        this._hubConnection.on('ReceiveMessage', (x, y) => {
          this.getReports();
        });
      })
      .catch((err) =>
        console.log('error while establishing signalr connection')
      );
  }

  getReports() {
    let date: any;
    let start;
    let end;
    date = this.date.value;
    start = convertDateToString(date[0]);
    end = convertDateToString(date[1]);
    if (this.delete) {
      date = convertDateToString(new Date());
      start = date;
      end = date;
    }
    if (!this.clientFilter) {
      this.getIncident(start, end);
    } else {
      console.log("client");

      this.getByClient();
    }
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
        this.getIncident(val.start, val.end);
        if (this.clientFilter) {
          this.getAllSecurityCompanies();
        }
      });
  }

  openGallery(gallery: any[]) {
    this.selectedGallery = gallery;
    this.display = true;
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
    console.log(this.id);

    this.delete = false;
    this.getReports();
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
      'نوع الحادث',
      'السبب',
      '	رقم الجوال',
      'بتاريخ',
      'الوصف',
      'الموقع',
      'الإجراء المضاد',
      'الحارس المسؤول	',
      'مشرف الأمن',
      'المناوبة',
    ],
  };

  
  getData() {
    this.dowenload = []
    for (let i = 0; i < this.report?.length; i++) {
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
        incidentType: this.report[i].incidentType?.nameAr
          ? this.report[i].incidentType?.nameAr
          : 'لا يوجد',
        reason: this.report[i].reason ? this.report[i].reason : 'لا يوجد',
        // phoneNumber:
        //   this.report[i].companySecurityGuard.securityGuard?.appUser?.userName,
        createdDateTime: this.report[i].createdDateTime,
        description: this.report[i].description
          ? this.report[i].description
          : 'لا يوجد',
        siteLocation: this.report[i].siteLocation
          ? this.report[i].siteLocation?.name
          : 'لا يوجد',
        actionToken: this.report[i].actionToken
          ? this.report[i].actionToken
          : 'لا يوجد',
        securityGuard: this.report[i]?.companySecurityGuard.securityGuard.firstName
          ? this.report[i]?.companySecurityGuard.securityGuard.firstName +
          ' ' + this.report[i]?.companySecurityGuard.securityGuard.middleName + ' ' +
          this.report[i]?.companySecurityGuard?.securityGuard?.lastName
          : 'لا يوجد',
        siteSupervisorShift: this.report[i].siteSupervisorShift?.companySecurityGuard
          .securityGuard.firstName
          ? this.report[i].siteSupervisorShift?.companySecurityGuard
            .securityGuard.firstName +
          ' ' + this.report[i].siteSupervisorShift?.companySecurityGuard
            .securityGuard.middleName + ' ' +
          this.report[i].siteSupervisorShift?.companySecurityGuard
            .securityGuard.lastName
          : 'لا يوجد',
        siteShift: (this.report[i].siteSupervisorShift?.clientShiftSchedule?.companyShift
          .shiftType) ?
          this.report[i].siteSupervisorShift?.clientShiftSchedule?.companyShift
            .shiftType?.name : 'لا يوجد',
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

  getByClient() {
    this.report = this.allData
    let myData: Incident[] = [];
    this.report.filter((ele: any) => {
      console.log(ele);
      if (
        ele.companySecurityGuard?.securityCompanyId ==
        this.id
      ) {


        myData.push(ele);
      }
    });
    this.report = myData;
  }
  deleteFilter() {
    this.filter = false;
    this.clientFilter = false;
    this.data = null;
    this.delete = true;
    this.getReports();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
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

  //   // Hide the column
  //   const hiddenColumnIndex = 10; // Assuming the column to hide is the second column (index 1)
  //   // ws['!cols'] = ws['!cols'] || [];
  //   // ws['!cols'][hiddenColumnIndex] = { hidden: true };

  //   // Remove the column from the sheet data
  //   for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //     const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: hiddenColumnIndex });
  //     delete ws[cellAddress];
  //   }

  //   // Update column references in the sheet data
  //   for (let c = hiddenColumnIndex + 1; c <= range.e.c; c++) {
  //     for (let r = range.s.r; r <= range.e.r; r++) {
  //       const cellAddress = XLSX.utils.encode_cell({ r: r, c: c });
  //       const newCellAddress = XLSX.utils.encode_cell({ r: r, c: c - 1 });
  //       ws[newCellAddress] = ws[cellAddress];
  //       delete ws[cellAddress];
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
    this.report = this.allData
    let myData: Incident[] = [];
    if (this.searchKey != '') {
      this.report.filter((ele: any) => {
        let name = ele.companySecurityGuard.securityGuard.firstName +
          ele.companySecurityGuard.securityGuard.middleName +
          ele.companySecurityGuard.securityGuard.lastName
        let phone = ele.companySecurityGuard.securityGuard?.appUser?.userName
        let reason = ele.reason
        let location = ele.siteLocation?.name 

        if (
          name.includes(this.searchKey.replace(/\s/g, '')) || phone.includes(this.searchKey.replace(/\s/g, '')) || reason.includes(this.searchKey.replace(/\s/g, ''))|| location.includes(this.searchKey.replace(/\s/g, ''))
        ) {
          myData.push(ele);
        }
      });
      this.report = myData;
      console.log(this.report);
      
    } else {
      this.report = this.allData;
      console.log(this.report);
    }
  }


}

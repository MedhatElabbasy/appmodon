import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { map } from 'rxjs';
import { saveAs } from 'file-saver';
import {
  convertDateToString,
  LangService,
  language,
  PAGINATION_SIZES,
  Roles,
} from 'projects/tools/src/public-api';
import { ngxCsv } from 'ngx-csv';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import html2canvas from 'html2canvas';
import { AttendanceReport } from '../../../models/attendance-report';
import { ReportsService } from '../../../services/reports.service';
import { AuthService } from '../../../../auth/services/auth.service';
// import { PackagesService } from '../../../../packages/services/packages.service';
// import { ClientsService } from '../../../../client/services/clients.service';
// import { Loader } from '../../../../core/enums/loader.enum';
import * as XLSX from 'xlsx';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
@Component({
  selector: 'app-super-visor',
  templateUrl: './super-visor.component.html',
  styleUrls: ['./super-visor.component.scss'],
})
export class SuperVisorComponent implements OnInit {
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
  date = new FormControl();
  report: any[] = [];
  maxDate = new Date();
  myFile!: any;
  yesterday!: Date;
  searchKey = '';
  dowenload: any[] = [];
  allData!: any[];
  securityCompanyClientId!: any;
  clientID!: any;
  dateFilter: boolean = false;
  Sites!: any;
  locationId!: any;
  start!: any;
  end!: any;
  constructor(
    private reports: ReportsService,
    private auth: AuthService,
    public lang: LangService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    // private PackagesService: PackagesService,
    // private client: ClientsService
  ) {



    // let today = new Date();
    // let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    // let day = String(today.getDate()).padStart(2, '0');
    // let year = today.getFullYear();

    // let formattedDate = month + ' ' + day + ' ' + year;
    // console.log(formattedDate);
    // this.getAttendance(formattedDate, formattedDate)

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
      .withUrl(environment.hub)
      .build();

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.invoke(
          'AddToGroup',
          `${this.auth.snapshot.userInfo?.id}-attendance`
        );

        this._hubConnection.on('ReceiveMessage', (x, y) => {
          this.getAllReports();
        });
      })
      .catch((err) =>
        console.log('error while establishing signalr connection')
      );
  }

  search() {
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
  }

  getClients() {
    if (this.clientID) {
      this.reports.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.clientID).subscribe((res) => {
        this.data = res;
        console.log(this.data);

      });
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
        this.pageNumber = 1
        this.pageSize = 5
        this.getAllReports();
      });
    console.log(this.date);
  }





  getDataFilter(filter: string) {
    this.filter = true;
    if (filter == 'client') {
      this.clientFilter = true;
      //this.getClients();
    } else {
      this.dateFilter = true;
      this.clientFilter = false;
    }
  }




  selectSecurity({ value }: any) {
    console.log(value);
    this.locationId = []
    this.securityCompanyClientId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
  }





  deleteFilter() {
    this.filter = false;
    this.data = null
    this.Sites = null
    this.pageNumber = 1;
    this.pageSize = 5
    this.getAllReports();
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
      "securityCompanyBranchList": [
      ],
      "clientSitesList": [],
      "startDate": this.start,
      "endDate": this.end,
      "page": this.pageNumber,
      "pageSize": this.pageSize,
      "searchKeyWord": this.searchKey
    }
    this.reports.SupervisorAttendanceReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      this.report = res.data
      this.total = res.totalCount;
    })
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
      'كود مشرف الأمن',
      'الاسم',
      // '	رقم الجوال',
      '	وقت الدخول',
      '	وقت الخروج',
      '	وقت العمل الرسمي',
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
    this.reports.SupervisorAttendanceReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      if (res) {
        this.allData = res.data;
        console.log('Aaaaaaa');
        this.dowenload = []
        for (let i = 0; i < this.allData.length; i++) {
          let tolatWorkHoureTime = '';
          let endDateTime = '';
          if (this.allData[i].tolatWorkHoureTime) {
            tolatWorkHoureTime = this.allData[i].tolatWorkHoureTime;
          } else {
            tolatWorkHoureTime = 'لا يوجد';
          }
          if (this.allData[i].endDateTime) {
            endDateTime = this.allData[i].endDateTime;
          } else {
            endDateTime = 'لا يوجد';
          }
          let field = {
            GuardCode:
              this.allData[i].siteSupervisorShift.companySecurityGuard.securityGuard
                .id,
            Name:
              this.allData[i].siteSupervisorShift.companySecurityGuard.securityGuard
                .firstName +
              ' ' +
              this.allData[i].siteSupervisorShift.companySecurityGuard.securityGuard
                .lastName,
            // phoneNumber:
            //   this.report[i].companySecurityGuard?.securityGuard?.appUser[
            //     'userName'
            //   ],
            startDateTime: this.allData[i].startDateTime,
            endDateTime: endDateTime,
            TotalWorkTime: tolatWorkHoureTime,
          };
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


  //   // Convert phone number column to string
  //   const range = XLSX.utils.decode_range(ws['!ref']);
  //   const phoneNumberColumnIndex = 2; // Assuming the phone number column is the third column (index 2)
  //   for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {

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


}

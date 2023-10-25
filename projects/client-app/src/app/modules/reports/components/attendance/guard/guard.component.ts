import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import { map } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  convertDateToString,
  LangService,
  language,
  PAGINATION_SIZES,
  Roles,
} from 'projects/tools/src/public-api';
import { ngxCsv } from 'ngx-csv';
import { AttendanceReport } from '../../../models/attendance-report';
import { ReportsService } from '../../../services/reports.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
//import { PackagesService } from '../../../../packages/services/packages.service';
//import { ClientsService } from '../../../../client/services/clients.service';
//import { Loader } from '../../../../core/enums/loader.enum';
@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.scss'],
})
export class GuardComponent implements OnInit {
  private _hubConnection!: HubConnection;

  id!: any;
  delete!: boolean;
  data: any;
  filter: boolean = false;
  clientFilter: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  date = new FormControl();
  report!: AttendanceReport[];
  maxDate = new Date();
  myFile!: any;
  yesterday!: Date;
  today!: Date;
  searchKey = '';
  dowenload: any[] = [];
  allData!: AttendanceReport[];
  isMainBranch: boolean = false;
  chosenSecurityCompanyId: any

  constructor(
    private reports: ReportsService,
    private auth: AuthService,
    public lang: LangService,
    private route: ActivatedRoute,
    private localeService: BsLocaleService,
    private _reports: ReportsService
    // private PackagesService:PackagesService,
    // private client: ClientsService
  ) {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.today = new Date();
    this.today.setDate(this.today.getDate());
    this.initDatePiker();
    this.connectHub();

    console.log(this.today);
    let today = new Date();
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(today.getDate()).padStart(2, '0');
    let year = today.getFullYear();

    let formattedDate = month + ' ' + day + ' ' + year;
    console.log(formattedDate);
    this.getAttendance(formattedDate, formattedDate)
  }

  ngOnInit(): void {
    this.onDateChange();
    this.route.data.subscribe((res) => {
      this.report = res['report'];
    });
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
      this.getAttendance(start, end);
    } else {
      this.getAttendanceByClient(start, end);
    }
  }
  getAttendance(startDate: string, endDate: string) {
    let user = this.auth.snapshot.userIdentity;

    if (user?.roles.includes(Roles.Company)) {
      console.log(user);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          this.reports
            .getAttendanceReport(startDate, res.id, endDate)
            .subscribe((res) => {
              this.report = res;
              this.allData = res;
              console.log(res);

            });
        }
      });
    } else {
      let user = this.auth.snapshot.userIdentity;
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          this.isMainBranch = res.clientCompanyBranch.isMainBranch
          if (!res.clientCompanyBranch.isMainBranch) {
            console.log(res.clientCompanyBranchId);

            // this._reports.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
            //securityCompanyBranchIdsecurityCompanyBranchId
            this.reports.GetAllByClientIdAndDateAndBranchId(res.clientCompanyBranch.clientCompanyId, startDate, endDate, res.clientCompanyBranch.id).subscribe((res) => {
              this.report = res;
              this.allData = res;
              console.log(res);
            })
            // })

          }
          else if (res.clientCompanyBranch.isMainBranch) {
            this.reports
              .getAttendanceReport(startDate, res.clientCompanyBranch.clientCompanyId, endDate)
              .subscribe((res) => {
                this.report = res;
                this.allData = res;
                console.log(res);

              });
          }
        }
      })

    }


  }

  search() {
    this.report = this.allData
    let myData: AttendanceReport[] = [];
    if (this.searchKey != '') {
      this.report.filter((ele: any) => {
        let name = ele.companySecurityGuard.securityGuard.firstName +
          ele.companySecurityGuard.securityGuard.middleName +
          ele.companySecurityGuard.securityGuard.lastName
        let phone = ele.companySecurityGuard.securityGuard?.appUser?.userName
        let id = ele.companySecurityGuard.securityGuard.id.toString()

        if (
          name.includes(this.searchKey.replace(/\s/g, '')) || phone.includes(this.searchKey.replace(/\s/g, '')) || id.includes(this.searchKey.replace(/\s/g, ''))
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


  getAttendanceByClient(startDate: string, endDate: string) {
    let user = this.auth.snapshot.userIdentity;
    let clientID: any
    if (user?.roles.includes(Roles.Company)) {
      clientID = this.auth.snapshot.userInfo?.id
      console.log("000");
      console.log(this.id);

      this.reports
        .getAttendanceReportByClientandBySecurityCompany(clientID, startDate, endDate, this.chosenSecurityCompanyId)
        .subscribe((res) => {
          this.report = res;
          console.log(res);
        });
    } else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          clientID = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId
          if (!res.clientCompanyBranch.isMainBranch) {

            console.log(clientID);
            console.log(this.id);

            // this._reports.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
            this.reports.getAttendanceReportByClientandBySecurityCompanyAndBranchId(startDate, endDate, this.id, clientID, res.clientCompanyBranch.id).subscribe((res) => {
              if (res) {
                this.report = res;
                console.log(res);
              }
            })
            // })
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            console.log(this.id);

            this.reports
              .getAttendanceReportByClientandBySecurityCompany(clientID, startDate, endDate, this.chosenSecurityCompanyId)
              .subscribe((res) => {
                this.report = res;
                console.log(res);
              });
          }
        }
      })
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
        this.getAttendance(val.start, val.end);
        if (this.clientFilter) {
          this.getAllSecurityCompanies();
        }
      });
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
          clientID = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId
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
  display(event: any) {
    // if (this.isMainBranch) {
      this.chosenSecurityCompanyId = event.value.securityCompany.id;
    // } else {
      this.id = event.value.id;

    // }

    console.log(event.value);

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
      ' كود الحارس',
      'الاسم',
      '	رقم الجوال',
      '	وقت الدخول',
      'تم التسجيل بواسطة',
      'الموقع',
      'الوقت الرسمي لبداية الدوام',
      '	وقت الخروج',
      '	الوقت الرسمي لإنتهاء الدوام',
      'في إستراحة',
      'سجل خروج',
      '	وقت العمل الفعلي',
      '	وقت الاستراحة',
      '	وقت العمل الإضافي',
      '	وقت العمل الرسمي',
      '	وقت الأستراحة الرسمي'
    ],
  };
  getData() {
    console.log(this.report);
    this.dowenload = []
    for (let i = 0; i < this.report.length; i++) {
      let LeaveTime = ''
      let onBreak = ''
      let isComplete = ''
      let totalWorkTime = ''
      let totalMustWorkTime = ''
      let toTalBreakTime = ''
      let totalExtraTime = ''
      let attendanceFrom = ''
      if (this.report[i].endTime) {
        LeaveTime = this.report[i].endTime
      } else {
        LeaveTime = 'لم يتم تسجيل الخروج'
      }
      if (this.report[i].isOnBreak) {
        onBreak = 'نعم'
      } else {
        onBreak = 'لا'
      }
      if (this.report[i].isComplete) {
        isComplete = 'نعم'
      } else {
        isComplete = 'لا'
      }
      if (this.report[i].toTalBreakTime) {
        toTalBreakTime = this.report[i].toTalBreakTime
      } else {
        toTalBreakTime = 'ليس في استراحة'
      }
      if (this.report[i].totalWorkTime) {
        totalWorkTime = this.report[i].totalWorkTime
      } else {
        totalWorkTime = 'لا يوجد'
      }
      if (this.report[i].totalExtraTime) {
        totalExtraTime = this.report[i].totalExtraTime
      } else {
        totalExtraTime = 'لم يتم العمل لوقت إضافي'
      }
      if (this.report[i].totalMustWorkTime) {
        totalMustWorkTime = this.report[i].totalMustWorkTime
      } else {
        totalMustWorkTime = 'لا يوجد'
      }
      if (this.report[i].attendanceFrom) {
        attendanceFrom = this.report[i].attendanceFrom
      } else {
        attendanceFrom = 'لا يوجد'
      }
      let field = {
        GuardCode: this.report[i].companySecurityGuard.securityGuard.id,
        Name:
          this.report[i].companySecurityGuard.securityGuard.firstName +
          ' ' + this.report[i].companySecurityGuard.securityGuard.middleName + ' ' +
          this.report[i].companySecurityGuard.securityGuard.lastName,
        phoneNumber:
          this.report[i].companySecurityGuard?.securityGuard?.appUser?.userName,
        StartTime: this.report[i].startTime.split(" ")[1],
        attendanceFrom: attendanceFrom,
        location: this.report[i].siteLocation.name,
        MustStart: this.report[i].mustStartDateTime,
        LeaveTime: LeaveTime.split(" ")[1],
        MustEndIn: this.report[i].mustEndDateTime,
        breakComplete: onBreak,
        isComplete: isComplete,
        TotalWorkTime: totalWorkTime,
        TotalBreakTime: toTalBreakTime,
        TotalExtraTime: totalExtraTime,
        TotalMustWorkTime: totalMustWorkTime,
        TotalMustBreakTime: this.report[i].toTalMustBreakTime
      };
      // console.log(field);

      this.dowenload.push(field);
    }
    console.log(this.dowenload);

    this.downloadData(this.dowenload)
  }
  // exportCSV() {
  //   this.getData();
  //   new ngxCsv(this.dowenload, 'My Report', this.options);
  //   this.dowenload = [];
  // }
  /* exportPDF() {
     const input = document.getElementById('my-table');
     if (input != null) {
       html2canvas(input).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF();
         pdf.addImage(imgData, 'PNG', 0, 0, 0, 0);
         pdf.save('download.pdf');
       });
   
   }*/


  /* const doc = new jsPDF();

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  autoTable(doc, { html: '#my-table' });
  doc.save('table.pdf')*/
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
  }

  //   exportexcel(): void {
  //     // let fileName = 'guards.xlsx';

  //     // let element = document.getElementById('excel-table');
  //     // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //     // const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //     // XLSX.writeFile(wb, fileName);

  //     let fileName = 'guards.xlsx';

  //     let element = document.getElementById('excel-table');
  //     const ws: any = XLSX.utils.table_to_sheet(element);
  // console.log(element);

  //     // Convert phone number column to string
  //     const range = XLSX.utils.decode_range(ws['!ref']);
  //     const phoneNumberColumnIndex = 2; // Assuming the phone number column is the third column (index 2)
  //     for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
  //       console.log(rowNum);

  //       const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: phoneNumberColumnIndex });
  //       const cell = ws[cellAddress];
  //       if (cell && cell.t === 'n') {
  //         cell.t = 's'; // Change the cell type to string
  //         cell.v = String(cell.v); // Convert the value to a string
  //       }

  //     }
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //     XLSX.writeFile(wb, fileName);
  //   }

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

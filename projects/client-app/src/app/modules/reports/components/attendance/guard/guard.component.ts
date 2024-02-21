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
import { SiteService } from '../../../../locations/services/site.service';
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
  totalWorkTime!: any;
  id!: number;
  delete!: boolean;
  data: any;
  filter: boolean = false;
  clientFilter: boolean = false;
  pageNumber = 1;
  pageSize = 5;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  date = new FormControl();
  report!: any[];
  maxDate = new Date();
  myFile!: any;
  yesterday!: Date;
  today!: Date;
  searchKey = '';
  dowenload: any[] = [];
  allData!: any[];
  clientSites!: any;
  securityCompanyId!: string;
  securityCompanyClientId!: any;
  newsecurityCompanyClientID!: string;
  clientID!: any;
  dateFilter: boolean = false;
  Sites!: any;
  locationId!: any;
  start!: any;
  end!: any;
  isMainBranch: boolean = false;
  branchFilter: boolean = false;
  branches!: any;
  branchId!: any;
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

  }

  ngOnInit(): void {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);

    this.initDatePiker();
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res) => {
        this.clientID = res?.id
        this.isMainBranch = true;
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
            this.isMainBranch = true;
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
      this._reports.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.clientID).subscribe((res) => {
        if (res) {
          this.data = res;
        }
      });
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

  getAllSites() {
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    this._reports.GlobalApiFilterGetAllSiteLocationByUserAndSCForUserClient(this.securityCompanyClientId, AppUserId).subscribe((res: any) => {
      this.Sites = res
    })
  }



  getDataFilter(filter: string) {
    this.filter = true;
    if (filter == 'branch') {
      this.clientFilter = true;
      this.branchFilter = true;
    } else if (filter == 'client') {
      this.clientFilter = true;
      this.branchFilter = false;
      // this.getClients();
    } else {
      this.dateFilter = true;
      this.clientFilter = false;
      this.branchFilter = false;
    }
  }

  getBySiteId({ value }: any) {
    this.locationId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
  }


  selectSecurity({ value }: any) {
    this.branchId = []
    this.locationId = []
    console.log(value);

    this.securityCompanyClientId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    if (this.isMainBranch) {
      if (this.branchFilter) {
        this.getAllReports();
        this.branches = []
        this.getBranches();
      } else {
        this.getAllReports();
        this.Sites = [];
        this.getAllSites();
      }

    } else {
      console.log(this.isMainBranch);
      this.getAllReports();
      this.Sites = [];
      this.getAllSites();
    }
  }


  getByBranchId({ value }: any) {
    this.branchId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllReports();
  }


  deleteFilter() {
    this.filter = false;
    this.data = null
    this.Sites = null
    this.branches = null
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
      "clientBranchList": this.branchId,
      "clientSitesList": this.locationId,
      "startDate": this.start,
      "endDate": this.end,
      "page": this.pageNumber,
      "pageSize": this.pageSize,
      "searchKeyWord": this.searchKey
    }
    this.reports.AttendanceReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      if (res) {
        this.report = res.data
        this.total = res.totalCount;
        this.calcTotalWorkTime(res.extraData);
      }
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
      ' كود الحارس',
      'الاسم',
      '	رقم الجوال',
      'أسم الموقع',
      '	وقت الدخول',
      'تم التسجيل بواسطة',
      'الوقت الرسمي لبداية الدوام',
      '	وقت الخروج',
      '	الوقت الرسمي لإنتهاء الدوام',
      'في إستراحة',
      'سجل خروج',
      '	وقت العمل الفعلي',
      '	وقت الاستراحة',
      '	وقت العمل الإضافي',
      '	وقت العمل الرسمي',
      '	وقت الأستراحة الرسمي',
    ],
  };
  getData() {
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    let model = {
      "clientCompanyId": this.clientID,
      "appUserId": AppUserId,
      "securityCompanyClientList": this.securityCompanyClientId,
      "clientBranchList": this.branchId,
      "clientSitesList": this.locationId,
      "startDate": this.start,
      "endDate": this.end,
      "page": 1,
      "pageSize": this.total,
      "searchKeyWord": this.searchKey
    }
    this.reports.AttendanceReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      if (res) {
        this.allData = res.data;
        for (let i = 0; i < this.allData.length; i++) {
          let LeaveTime = ''
          let onBreak = ''
          let isComplete = ''
          let totalWorkTime = ''
          let totalMustWorkTime = ''
          let toTalBreakTime = ''
          let totalExtraTime = ''
          let attendanceFrom = ''
          let attendanceNotes = '';
          if (this.allData[i].endTime) {
            LeaveTime = this.allData[i].endTime
          } else {
            LeaveTime = 'لم يتم تسجيل الخروج'
          }
          if (this.allData[i].isOnBreak) {
            onBreak = 'نعم'
          } else {
            onBreak = 'لا'
          }
          if (this.allData[i].isComplete) {
            isComplete = 'نعم'
          } else {
            isComplete = 'لا'
          }
          if (this.allData[i].toTalBreakTime) {
            toTalBreakTime = this.allData[i].toTalBreakTime
          } else {
            toTalBreakTime = 'ليس في استراحة'
          }
          if (this.allData[i].totalWorkTime) {
            totalWorkTime = this.allData[i].totalWorkTime
          } else {
            totalWorkTime = 'لا يوجد'
          }
          if (this.allData[i].totalExtraTime) {
            totalExtraTime = this.allData[i].totalExtraTime
          } else {
            totalExtraTime = 'لم يتم العمل لوقت إضافي'
          }
          if (this.allData[i].totalMustWorkTime) {
            totalMustWorkTime = this.allData[i].totalMustWorkTime
          } else {
            totalMustWorkTime = 'لا يوجد'
          }
          if (this.allData[i].attendanceFrom) {
            attendanceFrom = this.allData[i].attendanceFrom
          } else {
            attendanceFrom = 'لا يوجد'
          }
          if (this.allData[i].attendanceNotes && this.allData[i].attendanceNotes !== "null") {
            attendanceNotes = this.allData[i].attendanceNotes
          } else if (this.allData[i].attendanceNotes === "null") {
            attendanceNotes = 'لا يوجد'
          } else {
            attendanceNotes = 'لا يوجد'
          }
          let field = {
            GuardCode: this.allData[i].guardCode,
            Name:
              this.allData[i].name,
            phoneNumber:
              this.allData[i].phoneNumber,
            site: this.allData[i].siteLocationName,
            branchName:this.allData[i].branchName,
            StartTime: this.allData[i].startTime.split(" ")[1],
            attendanceFrom: attendanceFrom,
            MustStart: this.allData[i].mustStartDateTime,
            LeaveTime: LeaveTime,
            MustEndIn: this.allData[i].mustEndDateTime,
            breakComplete: onBreak,
            isComplete: isComplete,
            TotalWorkTime: totalWorkTime,
            TotalBreakTime: toTalBreakTime,
            TotalExtraTime: totalExtraTime,
            TotalMustWorkTime: totalMustWorkTime,
            TotalMustBreakTime: this.allData[i].toTalMustBreakTime,
            attendanceNotes: attendanceNotes
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

  exportexcel(): void {
    // let fileName = 'guards.xlsx';

    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, fileName);

    let fileName = 'guards.xlsx';

    let element = document.getElementById('excel-table');
    const ws: any = XLSX.utils.table_to_sheet(element);
    console.log(element);

    // Convert phone number column to string
    const range = XLSX.utils.decode_range(ws['!ref']);
    const phoneNumberColumnIndex = 2; // Assuming the phone number column is the third column (index 2)
    for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
      console.log(rowNum);

      const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: phoneNumberColumnIndex });
      const cell = ws[cellAddress];
      if (cell && cell.t === 'n') {
        cell.t = 's'; // Change the cell type to string
        cell.v = String(cell.v); // Convert the value to a string
      }

    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }



  //     let element = document.getElementById('excel-table');
  //     const ws: any = XLSX.utils.table_to_sheet(element);
  // console.log(element);

  //     let element = document.getElementById('excel-table');
  //     const ws: any = XLSX.utils.table_to_sheet(element);
  // console.log(element);

  // private _arrShowedInTable: any = [];

  // set arrShowedInTable(value: any) {
  //   if (this._arrShowedInTable !== value) {
  //     // Prop value has changed, perform actions here
  //   }
  //   this._arrShowedInTable = value;
  //   console.log(this._arrShowedInTable);
  //   console.log(this.calcTotalWorkTime(this._arrShowedInTable));


  // }

  // get arrShowedInTable(): any {
  //   return this._arrShowedInTable;
  // }

  // You can also change the value of arrShowedInTable through a method, which will trigger the setter.
  // updatearrShowedInTable(newValue: any) {
  //   this.arrShowedInTable = newValue;
  // }

  calcTotalWorkTime(totalWorkTime: any) {
    let totalMilliseconds = 0;

    //for (const timeString of arrShowedInTable) {
    if (totalWorkTime) {
      const parts = totalWorkTime.split(':');
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      // const timeSeconds = parts[2].split('.');
      // const seconds = parseInt(timeSeconds[0], 10);
      // const fractions = parseInt(timeSeconds[1], 10);

      totalMilliseconds += (hours * 3600000) + (minutes * 60000);
    }

    // }

    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    // const seconds = Math.floor((totalMilliseconds % 60000) / 1000);

    this.totalWorkTime = this.convertToArabicNumbers(`${hours} ساعة, ${minutes} دقيقة`)
    return `${hours} ساعة, ${minutes} دقيقة`;
  }


  convertToArabicNumbers(text: any) {
    const englishNumbers = '0123456789';
    const arabicNumbers = '٠١٢٣٤٥٦٧٨٩';

    // Create a mapping for English to Arabic numerals
    const numeralMap: any = {};
    for (let i = 0; i < englishNumbers.length; i++) {
      numeralMap[englishNumbers[i]] = arabicNumbers[i];
    }

    // Replace English numerals with Arabic numerals
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (numeralMap[char] !== undefined) {
        result += numeralMap[char];
      } else {
        result += char;
      }
    }

    return result;
  }
}

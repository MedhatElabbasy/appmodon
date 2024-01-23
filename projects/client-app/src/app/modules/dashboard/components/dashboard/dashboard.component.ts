import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'projects/client-app/src/environments/environment';
import { Roles, convertDateToString, mapTheme } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { AttendanceReport } from '../../models/attencereport';
import { AttendanceService } from '../../services/attendance.service';
import { ReportsService } from '../../../reports/services/reports.service';
import { Dropdown } from 'primeng/dropdown';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  selectedValue: any;
  message!: string;
  flag: boolean = true;
  sites: any;
  id!: number;
  siteId!: any;
  siteFilter: boolean = false;
  mainLocation = new google.maps.LatLng({
    lat: 23.8859,
    lng: 45.0792,
  });
  companyId!:any;

  data: any;
  style = mapTheme;
  private _hubConnection!: HubConnection;
  report!: any[];
  date = convertDateToString(new Date());
  yesterday!: Date;
  checkedIn: AttendanceReport[] = [];
  checkedOut: AttendanceReport[] = [];
  break: AttendanceReport[] = [];
  markers: { lat: any; lng: any; name: string }[] = [];
  guardsids: any[] = [];
  companies: any;
  mark!: boolean;
  chosenCompanyID: any;
  securityCompanyClientId: any;

  clientID!: any;
  constructor(
    private auth: AuthService,
    private _attendance: AttendanceService,
    private _report: ReportsService
  ) {
    this.connect();
  }





  ngOnInit(): void {

    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res) => {
        console.log(res);

        if (res?.id != undefined) {
          this.companyId = res?.id;
          this.getMarker();
         // this.chooseCompany(this.companyId);
        }
      })
    } else {
      this.auth.userInfo.subscribe((res) => {
        console.log(res);
        if (res?.clientCompanyBranch?.clientCompanyId != undefined) {
          console.log("Yes");
          console.log(res?.clientCompanyId);
          this.companyId = res?.clientCompanyId;
          this.getMarker();
         // this.chooseCompany(res?.clientCompanyBranch.clientCompanyId);
        }
      })
    }

//get undefiend
console.log(this.companyId);



  }

  ngAfterViewInit(): void {

  }

  getMarker() {

    this.getAttendance()

  }

  getDataFilter(type: string) {
    if (type == 'client') {
      this.siteFilter = false;
      this.siteId = [];
      this.sites = null;
      this.chooseCompany();
    } else {
      this.data = [];
      this.siteFilter = true;
      this.chooseCompany();
    }
  }



  private connect(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hub)
      .build();
    console.log(this.auth.snapshot.userInfo?.id);

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection
          .invoke('AddToGroup', `${this.auth.snapshot.userInfo?.id}-attendance`)
          .then(() => {
            this._hubConnection.on('ReceiveMessage', () =>
              this.getAttendance()

            );
          });
      })

      .catch((err) =>
        console.log('error while establishing signalr connection: ' + err)
      );
  }

  getAttendance() {
    // let date: any;
    // let start;
    // let end;
    this.report=[];
    this.checkedOut=[];
    this.checkedIn=[];
    this.markers=[];
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    console.log(AppUserId);
    console.log(this.securityCompanyClientId);

    let model
    model = {
      "clientCompanyId":  this.companyId ,
      "appUserId": AppUserId,
      "securityCompanyClientList": this.securityCompanyClientId,
      "securityCompanyBranchList": [],
      "clientSitesList":this.siteId,
      "startDate": convertDateToString(new Date()),
      "endDate":  convertDateToString(new Date()),
      "page": 1,
      "pageSize": 1000000000,
      "searchKeyWord": ""
    }
    // if (this.securityCompanyClientId) {
    //   model.securityCompanyClientList = this.securityCompanyClientId as never[]
    // }
    this._report.AttendanceReportGetAllForClientCompanyFilter(model).subscribe((res: any) => {
      this.report = res.data
      this.checkedOut = this.report?.filter((e: any) => e.isComplete);
      this.checkedIn = this.report?.filter((e: any) => !e.isComplete);
      this.checkedIn.forEach((x:any) => {
        if (x.locationTracking) {
          this.markers.push({
            name: x.name,
            lat: x.locationTracking.lat,
            lng: x.locationTracking.long,
          });
        }


      });
    })
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
  }

  chooseCompany() {
    this._report.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.companyId).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }

  getAllSites(){
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
      this._report.GlobalApiFilterGetAllSiteLocationByUserAndSCForUserClient(this.securityCompanyClientId ,AppUserId ).subscribe((res:any)=>{
        this.sites = res
      })
  }


  display({ value }: any) {
    this.securityCompanyClientId = [value]
    console.log(value);
    this.mark = true;
    this.siteId=[];
    this.getMarker();
    if(this.siteFilter==true){
    this.getAllSites();
    }
  }

  display2(event: any) {
    this.siteId = [event.value];
    this.markers = [];
    this.getMarker();

  }

  clear() {
    this.mark = false
    this.selectedValue = null;
    this.securityCompanyClientId=[];
    this.siteId=[];
    this.data=null;
    this.sites=null;
    this.getMarker();
  }
}

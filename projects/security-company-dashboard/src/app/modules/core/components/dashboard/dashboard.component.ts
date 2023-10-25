import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { environment } from 'projects/security-company-dashboard/src/environments/environment';
import {
  convertDateToString,
  mapTheme,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { AttendanceReport } from '../../../reports/models/attendance-report';
import { ReportsService } from '../../../reports/services/reports.service';
import { Loader } from '../../enums/loader.enum';
import { CompanyGuardsService } from '../../../guards/services/company-guards.service';
import { ClientsService } from './../../../client/services/clients.service';
import { ClientSiteService } from '../../../client/services/client-site.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  message!: string;
  flag: boolean = true;
  sites: any;
  id!: number;
  siteId!: string;
  siteFilter: boolean = false;
  mainLocation = new google.maps.LatLng({
    lat: 23.8859,
    lng: 45.0792,
  });
  data: any;
  style = mapTheme;
  private _hubConnection!: HubConnection;
  report!: AttendanceReport[];
  date = convertDateToString(new Date());
  yesterday!: Date;
  checkedIn: AttendanceReport[] = [];
  checkedOut: AttendanceReport[] = [];
  break: AttendanceReport[] = [];
  markers: { lat: any; lng: any; name: string }[] = [];
  guardsids: any[] = [];

  constructor(
    private auth: AuthService,
    private reports: ReportsService,
    private route: ActivatedRoute,
    private guard: CompanyGuardsService,
    private client: ClientsService,
    private site: ClientSiteService
  ) {
    this.connect();
    guard.getAllGuardsOnCompany().subscribe((x) => {
      x.forEach((element) => {
        this.guardsids.push(element.id);
      });
    });
  }

  ngOnInit(): void {
    this.getMarker();
  }
  getMarker() {
    if (this.flag) {
      this.route.data.subscribe((res) => {
        let data = res['report'];
        this.report = data;
        this.checkedOut = data.filter((e: AttendanceReport) => e.isComplete);
        this.break = data.filter((e: AttendanceReport) => e.isOnBreak);
        this.checkedIn = data.filter((e: AttendanceReport) => !e.isComplete);
        this.checkedIn.forEach((x) => {
          this.markers.push({
            name:
              x?.companySecurityGuard.securityGuard?.firstName +
              ' ' +
              x?.companySecurityGuard.securityGuard?.lastName,
            lat: x.locationTracking[x.locationTracking.length - 1].lat,
            lng: x.locationTracking[x.locationTracking.length - 1].long,
          });
        });
      });
    } else {
      if (!this.siteId) {
        this.reports
          .getAttendanceReportByClient(this.date, this.date, this.id, Loader.no)
          .subscribe((res) => {
            this.report = res;
            this.checkedOut = res.filter((e) => e.isComplete);
            this.break = res.filter((e) => e.isOnBreak);
            this.checkedIn = res.filter((e) => !e.isComplete);
            this.checkedIn.forEach((x) => {
              this.markers.push({
                name:
                  x?.companySecurityGuard.securityGuard?.firstName +
                  ' ' +
                  x?.companySecurityGuard.securityGuard?.lastName,
                lat: x.locationTracking[x.locationTracking.length - 1].lat,
                lng: x.locationTracking[x.locationTracking.length - 1].long,
              });
            });
          });
      } else {
        let reportBySite: any[] = [];
        this.report.forEach((element) => {
          if (element.siteLocation.clientSiteId == this.siteId) {
            reportBySite.push(element);
          }
        });
        this.checkedOut = reportBySite.filter((e) => e.isComplete);
        this.break = reportBySite.filter((e) => e.isOnBreak);
        this.checkedIn = reportBySite.filter((e) => !e.isComplete);
        console.log(this.checkedIn);

        this.checkedIn.forEach((x) => {
          this.markers.push({
            name:
              x?.companySecurityGuard.securityGuard?.firstName +
              ' ' +
              x?.companySecurityGuard.securityGuard?.lastName,
            lat: x.locationTracking[x.locationTracking.length - 1]?.lat,
            lng: x.locationTracking[x.locationTracking.length - 1]?.long,
          });
        });
        console.log(this.markers);
      }
    }
  }
  private connect(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hub)
      .build();

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection
          .invoke('AddToGroup', `${this.auth.snapshot.userInfo?.id}-attendance`)
          .then(() => {
            this._hubConnection.on('ReceiveMessage', () => {
              if (this.flag) {
                this.getAttendance(this.date, this.date, Loader.no);
              } else {
                this.getAttendanceByClient(
                  this.date,
                  this.date,
                  Loader.no,
                  this.id
                );
              }
            });
          });
      })
      .catch((err) =>
        console.log('error while establishing signalr connection: ' + err)
      );
  }

  getAttendance(startDate: string, endDate: string, loader: Loader) {
    this.reports
      .getAttendanceReport(startDate, endDate, Loader.no)
      .subscribe((res) => {
        this.report = res;
        this.checkedOut = res.filter((e) => e.isComplete);
        this.break = res.filter((e) => e.isOnBreak);
        this.checkedIn = res.filter((e) => !e.isComplete);
      });
  }

  getAttendanceByClient(
    startDate: string,
    endDate: string,
    loader: Loader,
    clientId: number
  ) {
    this.reports
      .getAttendanceReportByClient(startDate, endDate, clientId, Loader.no)
      .subscribe((res) => {
        this.report = res;
        console.log(res);
        this.checkedOut = res.filter((e) => e.isComplete);
        this.break = res.filter((e) => e.isOnBreak);
        this.checkedIn = res.filter((e) => !e.isComplete);
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
  }
  getDataFilter(type: string) {
    if (type == 'client') {
      this.siteFilter = false;
      this.siteId = '';
      this.sites = null;
      this.getClients();
    } else {
      this.data = [];
      this.siteFilter = true;
      this.getClients();
    }
  }
  getClients() {
    this.client.getClientsBySecurityCompany(1, 20000).subscribe((res) => {
      this.data = res.data;
    });
  }
  display(event: any) {
    this.id = event.value;
    this.flag = false;
    this.markers = [];
    this.getMarker();
    if (this.siteFilter) {
      let StringId = '';
      this.data.forEach((element: any) => {
        if (element.clientCompany.id == this.id) {
          StringId = element.id;
        }
        return;
      });
      this.site.getAllByClientId(StringId).subscribe((res) => {
        this.sites = res;
      });
    }
  }
  display2(event: any) {
    this.siteId = event.value;
    this.markers = [];
    this.getMarker();
  }
  deleteFilter() {
    this.flag = true;
    this.sites = null;
    this.data = null;
    this.siteFilter = false;
    this.siteId = '';
    this.getMarker();
  }
}

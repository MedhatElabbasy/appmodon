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
  companies: any;
  mark!: boolean;
  isMainBranch!: boolean;
  chosenSecurityCompanyClientId: any
  chosenSecurityCompanyId: any
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
        if (res?.id != undefined) {
          this.getMarker();
          this.chooseCompany(res?.id);
        }
      })
    } else {
      console.log(this.auth.snapshot.userInfo?.clientCompanyId);

      this.auth.userInfo.subscribe((res) => {

        console.log(res);
        if (res?.clientCompanyBranch?.clientCompanyId != undefined) {
          console.log("Yes");
          console.log(res?.clientCompanyId);
          this.getMarker();

          this.chooseCompany(res?.clientCompanyBranch.clientCompanyId);

        }

      })
    }
  }

  ngAfterViewInit(): void {

  }

  getMarker() {
    this.markers = [];
    console.log("getMarker");

    if (this.mark == true) {
      console.log(this.mark);

      let user = this.auth.snapshot.userIdentity;
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          console.log(res);

          if (user?.roles.includes(Roles.Company) || res.clientCompanyBranch.isMainBranch) {


            console.log(this.chosenSecurityCompanyId);
            this._attendance.getAttendanceReportByCompany(this.date, this.date, this.chosenSecurityCompanyId)
              .subscribe((res) => {

                this.report = res;
                console.log(this.report);

                this.checkedOut = res.filter((e) => e.isComplete);
                this.break = res.filter((e) => e.isOnBreak);
                this.checkedIn = res.filter((e) => !e.isComplete);
                this.checkedIn.forEach((x) => {
                  console.log(x);
                  // if(x?.locationTracking.length == 0){
                  //   console.log("true");

                  // x.locationTracking.forEach((res)=>{
                  //   console.log(res);

                  if (x?.locationTracking.length == 0) {
                    console.log("true");

                    this.markers.push({
                      name:
                        x?.companySecurityGuard.securityGuard?.firstName +
                        ' ' +
                        x?.companySecurityGuard.securityGuard?.lastName,
                      lat: x?.lat,
                      lng: x?.long,
                    });
                  } else {
                    console.log("else condition");
                    this.markers.push({
                      name:
                        x?.companySecurityGuard.securityGuard?.firstName +
                        ' ' +
                        x?.companySecurityGuard.securityGuard?.lastName,
                      lat: x?.locationTracking[x.locationTracking.length - 1]?.lat,
                      lng: x?.locationTracking[x.locationTracking.length - 1]?.long,
                    });
                  }
                  // })
                  console.log(this.markers);


                });
              });
            this.mark = false
          }
          else if (!res.clientCompanyBranch.isMainBranch) {
            console.log(res);
            this._report.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranchId).subscribe((res) => {
              console.log(res);

            })
            console.log(res);

            this._report.getAttendanceReportByClientandBySecurityCompanyAndBranchId(this.date, this.date, this.chosenSecurityCompanyClientId, res.clientCompanyBranch.clientCompanyId, res.clientCompanyBranchId)
              .subscribe((res: any) => {
                this.report = res;
                console.log(this.report);

                this.checkedOut = res.filter((e: any) => e.isComplete);
                this.break = res.filter((e: any) => e.isOnBreak);
                this.checkedIn = res.filter((e: any) => !e.isComplete);
                this.checkedIn.forEach((x) => {
                  console.log(x);
                  // if(x?.locationTracking.length == 0){
                  //   console.log("true");

                  // x.locationTracking.forEach((res)=>{
                  //   console.log(res);

                  if (x?.locationTracking.length == 0) {
                    console.log("true");

                    this.markers.push({
                      name:
                        x?.companySecurityGuard.securityGuard?.firstName +
                        ' ' +
                        x?.companySecurityGuard.securityGuard?.lastName,
                      lat: x?.lat,
                      lng: x?.long,
                    });
                  } else {
                    console.log("else condition");
                    this.markers.push({
                      name:
                        x?.companySecurityGuard.securityGuard?.firstName +
                        ' ' +
                        x?.companySecurityGuard.securityGuard?.lastName,
                      lat: x?.locationTracking[x.locationTracking.length - 1]?.lat,
                      lng: x?.locationTracking[x.locationTracking.length - 1]?.long,
                    });
                  }
                  // })
                  console.log(this.markers);


                });
              });
            this.mark = false
          }
        }
      });

    }
    else {

      let user = this.auth.snapshot.userIdentity;

      if (user?.roles.includes(Roles.Company)) {
        console.log(this.mark);
        this._attendance
          .getAttendanceByClientAndDate(this.date, this.date)
          .subscribe((res) => {
            this.report = res;
            console.log(this.report);

            this.checkedOut = res.filter((e) => e.isComplete);
            this.break = res.filter((e) => e.isOnBreak);
            this.checkedIn = res.filter((e) => !e.isComplete);
            this.checkedIn.forEach((x) => {
              console.log(x);
              // if(x?.locationTracking.length == 0){
              //   console.log("true");

              // x.locationTracking.forEach((res)=>{
              //   console.log(res);

              if (x?.locationTracking.length == 0) {
                console.log("true");

                this.markers.push({
                  name:
                    x?.companySecurityGuard.securityGuard?.firstName +
                    ' ' +
                    x?.companySecurityGuard.securityGuard?.lastName,
                  lat: x?.lat,
                  lng: x?.long,
                });
              } else {
                console.log("else condition");
                this.markers.push({
                  name:
                    x?.companySecurityGuard.securityGuard?.firstName +
                    ' ' +
                    x?.companySecurityGuard.securityGuard?.lastName,
                  lat: x?.locationTracking[x.locationTracking.length - 1]?.lat,
                  lng: x?.locationTracking[x.locationTracking.length - 1]?.long,
                });
              }
              // })
              console.log(this.markers);


            });
          });
      } else {
        this.auth.userInfo.subscribe((res: any) => {
          if (res) {
            this.isMainBranch = res.clientCompanyBranch.isMainBranch
            console.log(res);

            if (!res.clientCompanyBranch.isMainBranch) {
              // this._report.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranch.id).subscribe((res2) => {
              // console.log(res2);
              //securityCompanyBranchIdsecurityCompanyBranchId
              this._report.GetAllByClientIdAndDateAndBranchId(res.clientCompanyBranch.clientCompanyId, this.date, this.date, res.clientCompanyBranch.id)
                .subscribe((res: any) => {
                  console.log(res);

                  this.report = res;
                  this.checkedOut = res.filter((e: any) => e.isComplete);
                  this.break = res.filter((e: any) => e.isOnBreak);
                  this.checkedIn = res.filter((e: any) => !e.isComplete);
                  this.checkedIn.forEach((x) => {
                    console.log(x);
                    if (x?.locationTracking.length == 0) {
                      console.log("true");

                      this.markers.push({
                        name:
                          x?.companySecurityGuard.securityGuard?.firstName +
                          ' ' +
                          x?.companySecurityGuard.securityGuard?.lastName,
                        lat: x?.lat,
                        lng: x?.long,
                      });
                    } else {
                      console.log("else condition");
                      this.markers.push({
                        name:
                          x?.companySecurityGuard.securityGuard?.firstName +
                          ' ' +
                          x?.companySecurityGuard.securityGuard?.lastName,
                        lat: x?.locationTracking[x.locationTracking.length - 1]?.lat,
                        lng: x?.locationTracking[x.locationTracking.length - 1]?.long,
                      });
                    }
                  });
                })
              // })

            }
            else if (res.clientCompanyBranch.isMainBranch) {
              console.log(this.mark);
              this._attendance
                .getAttendanceByClientAndDate(this.date, this.date)
                .subscribe((res) => {
                  this.report = res;
                  console.log(this.report);

                  this.checkedOut = res.filter((e) => e.isComplete);
                  this.break = res.filter((e) => e.isOnBreak);
                  this.checkedIn = res.filter((e) => !e.isComplete);
                  this.checkedIn.forEach((x) => {
                    console.log(x);
                    // if(x?.locationTracking.length == 0){
                    //   console.log("true");

                    // x.locationTracking.forEach((res)=>{
                    //   console.log(res);

                    if (x?.locationTracking.length == 0) {
                      console.log("true");

                      this.markers.push({
                        name:
                          x?.companySecurityGuard.securityGuard?.firstName +
                          ' ' +
                          x?.companySecurityGuard.securityGuard?.lastName,
                        lat: x?.lat,
                        lng: x?.long,
                      });
                    } else {
                      console.log("else condition");
                      this.markers.push({
                        name:
                          x?.companySecurityGuard.securityGuard?.firstName +
                          ' ' +
                          x?.companySecurityGuard.securityGuard?.lastName,
                        lat: x?.locationTracking[x.locationTracking.length - 1]?.lat,
                        lng: x?.locationTracking[x.locationTracking.length - 1]?.long,
                      });
                    }
                    // })
                    console.log(this.markers);


                  });
                });

            }
          }
        })
      }
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
    let user = this.auth.snapshot.userIdentity;

    if (user?.roles.includes(Roles.Company)) {
      this._attendance
        .getAttendanceByClientAndDate(this.date, this.date)
        .subscribe((res) => {
          this.report = res;
          this.checkedOut = res.filter((e) => e.isComplete);
          this.break = res.filter((e) => e.isOnBreak);
          this.checkedIn = res.filter((e) => !e.isComplete);
        });
    } else {
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          console.log(res);

          if (!res.clientCompanyBranch.isMainBranch) {

            // this._report.getSecurityCompanyBranchIdByClientCompanyBranchId(res.clientCompanyBranchId).subscribe((res2) => {
            // console.log(res2);
            //securityCompanyBranchIdsecurityCompanyBranchId
            this._report.GetAllByClientIdAndDateAndBranchId(res.clientCompanyBranch.clientCompanyId, this.date, this.date, res.clientCompanyBranchId)
              .subscribe((res: any) => {
                console.log(res);

                this.report = res;
                this.checkedOut = res.filter((e: any) => e.isComplete);
                this.break = res.filter((e: any) => e.isOnBreak);
                this.checkedIn = res.filter((e: any) => !e.isComplete);
              })
            // })


          } else if (res.clientCompanyBranch.isMainBranch) {
            this._attendance
              .getAttendanceByClientAndDate(this.date, this.date)
              .subscribe((res) => {
                this.report = res;
                this.checkedOut = res.filter((e) => e.isComplete);
                this.break = res.filter((e) => e.isOnBreak);
                this.checkedIn = res.filter((e) => !e.isComplete);
              });
          }
        }
      });
    }
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._hubConnection.stop();
    this.chosenSecurityCompanyClientId = ""
  }

  chooseCompany(clientID: number) {
    // let clientID=this.auth.snapshot.userInfo?.clientCompanyId
    // console.log(clientID);

    // if (clientID) {
    this.auth.getAllSecurityCompaniesByClientId(clientID, 1, 1000).subscribe((res: any) => {
      console.log(res.data);
      this.companies = res.data;
    })
    // }
  }


  display(event: any) {
    console.log(this.isMainBranch);
    console.log(event.value);

    // if(this.isMainBranch){
    this.chosenSecurityCompanyId = event.value.securityCompany.id;
    // }else{
    this.chosenSecurityCompanyClientId = event.value.id;

    // }

    console.log(this.chosenSecurityCompanyClientId);
    this.mark = true;
    this.mark = true;
    this.getMarker();
  }

  clear() {
    this.mark = false
    this.getMarker();

    this.selectedValue = null;
  }
}
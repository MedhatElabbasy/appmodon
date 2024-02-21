import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'projects/client-app/src/environments/environment';
import { ModalService, Roles, convertDateToString, mapTheme } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { AttendanceReport } from '../../models/attencereport';
import { AttendanceService } from '../../services/attendance.service';
import { ReportsService } from '../../../reports/services/reports.service';
import { Dropdown } from 'primeng/dropdown';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { map } from 'rxjs';
import { MapInfoWindow } from '@angular/google-maps';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow | undefined;

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
  markers: { lat: any; lng: any; name: string ;siteLocationName:string,securityCompanyName:string ,
  guardCode:number , guardImage:string ,phoneNumber:number , nationalId:number,branchName:string,
   clientName:string , siteNumber:number , supervisorName:string ,shiftName:string , startTime:string}[] = [];
  guardsids: any[] = [];
  companies: any;
  mark!: boolean;
  chosenCompanyID: any;
  securityCompanyClientId: any;
  branchFilter:boolean=false;
  isMainBranch:boolean=false;
  clientID!: any;
  branches!:any;
  branchId!:any;
  searchKey=''
  infoContent!: string;
  guardDetailsId="DetailsIdddd";
  guardDetails!:any;
  allCheckIn: AttendanceReport[] = [];
  allCheckOut: AttendanceReport[] = [];
  allBreak: AttendanceReport[] = [];
  constructor(
    private auth: AuthService,
    private _attendance: AttendanceService,
    private _report: ReportsService,private _model:ModalService
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
          this.isMainBranch = true;
          console.log("mainbranch");
          
          this.getMarker();
         // this.chooseCompany(this.companyId);
        }
      })
    } else {
      this.auth.userInfo.subscribe((res:any) => {
        console.log(res);
        // if (res?.clientCompanyBranch?.clientCompanyId != undefined) {
        //   console.log("Yes");
        //   console.log(res?.clientCompanyId);
        //   this.companyId = res?.clientCompanyId;
        //   this.getMarker();
        // this.chooseCompany(res?.clientCompanyBranch.clientCompanyId);
        // }
        if (!res.clientCompanyBranch.isMainBranch) {
          this.companyId = res?.clientCompanyBranch.clientCompanyId;
          this.getMarker();
          //this.chooseCompany();
        }
        else if (res.clientCompanyBranch.isMainBranch) {
          console.log("usermainbranch");
          console.log(res.clientCompanyId);
          
          this.companyId = res?.clientCompanyId
          this.isMainBranch = true;
          this.getMarker();
         // this.chooseCompany();
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
    if(type == 'branch'){
  this.branchFilter=true;
  this.branches=null;
  this.branchId=[];
  this.siteFilter = false;
  this.chooseCompany();
    }else
    if (type == 'client') {
      this.siteFilter = false;
      this.siteId = [];
      this.sites = null;
      this.branches=null;
      this.branchId=[];
      this.branchFilter = false;
      console.log(this.siteFilter ,  this.branchFilter);
      
      this.chooseCompany();
    } else if(type == 'site') {
      this.branchFilter = false;
      this.branches=null;
      this.branchId=[];
      this.data = [];
      this.sites=null;
      this.siteFilter = true;
      this.chooseCompany();
    }
  }



  private connect(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hub)
      .build();
    console.log(this.auth.snapshot.userInfo);

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
      "clientBranchList": this.branchId,
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
      //console.log(this.report);
      this.checkedOut = this.report?.filter((e: any) => e.isComplete);
      console.log(this.checkedOut);
      this.allCheckOut = this.checkedOut
      this.break = this.report?.filter((e:any) => e.isOnBreak);
      this.allBreak = this.break
      this.checkedIn = this.report?.filter((e: any) => !e.isComplete);
      this.allCheckIn=this.checkedIn
      this.checkedIn.forEach((x:any) => {
       // console.log(x);
        if (x.locationTracking) {
          this.markers.push({
            name: x.name,
            siteLocationName:x.siteLocationName,
            phoneNumber:x.phoneNumber,
            guardCode:x.guardCode,
            guardImage:x.guardImage,
            nationalId:x.nationalId,
            clientName:x.clientName,
            branchName:x.branchName,
            supervisorName:x.supervisorName,
            siteNumber:x.siteNumber,
            shiftName:x.shiftName,
            startTime:x.startTime,
            securityCompanyName:x.securityCompanyName,
            lat: x.locationTracking.lat,
            lng: x.locationTracking.long,
          });
        }
      });
    })
  }

  openInfo(marker: any,content:string,guardCode:number ,guardImage:string,name:string , phoneNumber:number 
    , nationalId:number , securityCompanyName:string , branchName:string , clientName:string , 
    siteLocationName:string ,supervisorName:string , siteNumber:any , shiftName:string ,startTime:string ) {
    console.log(guardImage);
    const siteLocationContent =
    siteLocationName !== null ? `<h6 class="">${siteLocationName}</h6>` : '<h6>لا يوجد</h6>';
   const siteNumberContent =  siteNumber !== "" ?  `<h6 class="">${siteNumber}</h6>` : '<h6>لا يوجد</h6>';
   const supervisorNameContent =  supervisorName !== null ?  `<h6 class="">${supervisorName}</h6>` : '<h6>لا يوجد</h6>';
   const shiftNameContent =  shiftName !== null ?  `<h6 class="">${shiftName}</h6>` : '<h6>لا يوجد</h6>';
   this.infoContent = `<div class="row"><div class="col-8"><div class="row">
    <div class="col-12"><h6 class="text-muted">أسم المراقب</h6><h6 class="">`+name+`</h6></div>
    <div class="col-12"><h6 class="text-muted">رقم التواصل</h6><h6 class="">`+phoneNumber+`</h6></div>
    <div class="col-6"><h6 class="text-muted">رقم الهوية الوطنية</h6><h6 class="">`+nationalId+`</h6></div>
    <div class="col-6"><h6 class="text-muted">الكود</h6><h6 class="">`+guardCode+`</h6></div>
    </div></div>
    <div class="col-4"><img src="`+guardImage+`" class="Imgfluid rounded infoCardImg"/></</div></div><hr>
    <div class="row"><div class="col-4"><h6 class="text-muted">أسم الشركة الأمنية</h6><h6 class="">`+securityCompanyName+`</h6></div>
    <div class="col-4"><h6 class="text-muted">الفرع</h6><h6 class="">`+clientName+`</h6></div>
    <div class="col-4"><h6 class="text-muted">العميل</h6><h6 class="">`+branchName+`</h6></div></div><hr>
    <div class="row"><div class="col-4"><h6 class="text-muted">أسم الموقع</h6>`+siteLocationContent+`</div>
    <div class="col-4"><h6 class="text-muted">رقم الموقع</h6>`+siteNumberContent+`</div>
    <div class="col-4"><h6 class="text-muted">المشرف</h6><h6 class="">`+supervisorNameContent+`</h6></div>
    <div class="col-4"><h6 class="text-muted">المناوبة</h6><h6 class="">`+shiftNameContent+`</h6></div>
    <div class="col-4"><h6 class="text-muted">وقت الدخول</h6><h6 class="">`+startTime.split(' ')[1]+`</h6></div></div>
    `
    console.log(this.infoContent);
    
    setTimeout(() => {
      this.infoWindow?.open(marker);
    }, 500);
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

  getBranches() {
    if (this.companyId) {
      this._report.GlobalApiFilterGetAllClientBranch(this.companyId).subscribe((res) => {
        this.branches = res;
        console.log(this.branches);

      });
    }
  }


  display({ value }: any) {
    this.securityCompanyClientId = [value]
    console.log(value);
    this.mark = true;
    this.branchId = [];
    this.branches=null;
    this.siteId=[];
    this.sites=null;
    if(this.siteFilter==true){
      console.log('sitefilter');
      this.getMarker();
    this.getAllSites();
    }else if(this.branchFilter==true){
      console.log('branchfilter');
      this.getMarker();
      this.getBranches();
    }else{
      this.getMarker();
    }
  }

  display2(event: any) {
    this.siteId = [event.value];
    this.markers = [];
    this.getMarker();

  }

  getByBranchId({ value }: any) {
    this.branchId = [value.id]
    this.getMarker();
  }

  clear() {
    this.mark = false
    this.selectedValue = null;
    this.securityCompanyClientId=[];
    this.siteId=[];
    this.branches = null
    this.branchId=[];
    this.data=null;
    this.sites=null;
    this.getMarker();
  }

  details(data:AttendanceReport){
    if(data != null){
    this.guardDetails=data;
   //this.guardDetailsId=data.guardCode.toString();
   if( this.guardDetails!=null){
    console.log(this.guardDetails);
 
    this.open(this.guardDetailsId)

   }
  }
  }

  open(Id:any){
    console.log(this.guardDetails.name);
    
    this._model.open(this.guardDetailsId)
  }

  close(){
    this._model.close(this.guardDetailsId);
    
  }

search(searchtype:string){
if(searchtype == 'checkIn'){
  this.checkedIn = this.allCheckIn
  console.log(this.checkedIn);
  let myData: any[] = [];
  if (this.searchKey != '') {
    console.log(this.searchKey);
    
    this.checkedIn.filter((ele: any) => {
      let name = ele.name.toLowerCase() 
      let number = ele.phoneNumber
      if (
        name.includes(this.searchKey.replace(/\s/g, '').toLowerCase() ) || number?.includes(this.searchKey.replace(/\s/g, ''))
      ) {
        myData.push(ele);
      }
    });
    this.checkedIn = myData;
  } else {
    this.checkedIn = this.allCheckIn;
  }
}else if(searchtype == 'checkOut'){
  this.checkedOut = this.allCheckOut
  console.log(this.checkedOut);
  let myData: any[] = [];
  if (this.searchKey != '') {
    console.log(this.searchKey);
    
    this.checkedOut.filter((ele: any) => {
     // console.log(ele.name);
      
      let name = ele.name.toLowerCase() 
      let number = ele.phoneNumber
      if (
        name.includes(this.searchKey.replace(/\s/g, '').toLowerCase()) || number?.includes(this.searchKey.replace(/\s/g, ''))
      ) {
        
        myData.push(ele);
      }
    });
    this.checkedOut = myData;
  } else {
    this.checkedOut = this.allCheckOut;
  }
}else if(searchtype == 'checkBreak'){
  this.break = this.allBreak
  console.log(this.break);
  let myData: any[] = [];
  if (this.searchKey != '') {
    console.log(this.searchKey);
    
    this.break.filter((ele: any) => {
      console.log(ele.name);
      
      let name = ele.name.toLowerCase() 
      let number = ele.phoneNumber
      if (
        name.includes(this.searchKey.replace(/\s/g, '').toLowerCase() ) || number?.includes(this.searchKey.replace(/\s/g, ''))
      ) {
        console.log(name.includes(this.searchKey.replace(/\s/g, '')));
        
        myData.push(ele);
      }
    });
    this.break = myData;
  } else {
    this.break = this.allBreak ;
  }
}
}

}

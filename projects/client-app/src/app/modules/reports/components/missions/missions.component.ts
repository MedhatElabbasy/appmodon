import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { missionsReport } from '../../models/missions-report';
import { CanvasService } from 'projects/tools/src/lib/services/canvas.service';
import { LangService, PAGINATION_SIZES, Roles, convertDateToString, language } from 'projects/tools/src/public-api';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { map } from 'rxjs';


@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  //allData!: VisitorsReport[];
  id!: number;
  delete!: boolean;
  data: any;
  filter: boolean = false;
  clientData!: any[];
  clientFilter: boolean = false;
  dateFilter: boolean = false;
  pageNumber = 1;
  pageSize = 5;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  date = new FormControl(new Date());
  visitorsReport!: any[];
  maxDate = new Date();
  searchKey = '';
  dowenload: any[] = [];
  companyId!: any;
  missions!: any[];
  allData: any[] = [];
  messionID = "missionDetails";
  clientID!: any;
  missionDetails!: any;
  display: boolean = false;
  selectedGallery: any[] = [];
  Sites!: any;
  securityCompanyClientId!: any;
  locationId!: any;
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 1000;
  SearchKeyWord = "";
  branches!: any;
  branchId!: any;
  branchFilter:boolean=false;
  isMainBranch:boolean=false;
  constructor(private _reports: ReportsService, private localeService: BsLocaleService, public lang: LangService, public _CanvasService: CanvasService,
    private route: ActivatedRoute, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.initDatePiker();
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res) => {
        this.clientID = res?.id
        this.isMainBranch=true;
        this.onDateChange();
        this.getAllMissions()
      })
    } else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          if (!res.clientCompanyBranch.isMainBranch) {
            this.clientID = res?.clientCompanyBranch.clientCompanyId
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            this.clientID = res?.clientCompanyId;
            this.isMainBranch=true;
          }
          this.onDateChange();
          this.getAllMissions()
        }
      })
    }
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAllMissions();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getAllMissions();
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

  getClients() {
    //let AppUserId = this.auth.snapshot.userInfo?.appUser.id
    this._reports.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.clientID).subscribe((res) => {
      this.data = res;
    })
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
        this.getAllMissions();
      });
    console.log(this.date);
  }
  //

  getAllSites() {
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    this._reports.GlobalApiFilterGetAllSiteLocationByUserAndSCForUserClient(this.securityCompanyClientId, AppUserId).subscribe((res: any) => {
      this.Sites = res
    })
  }

  getAllMissions() {
    let date: any;
    let start;
    let end;
    let AppUserId = this.auth.snapshot.userIdentity?.['userId']
    let model

    if (this.filter == false) {
      date = convertDateToString(new Date());
      start = date;
      end = date;
      this.securityCompanyClientId = []
      this.locationId = []
      this.branchId = []
    } else {
      date = this.date.value;
      start = convertDateToString(date[0]);
      end = convertDateToString(date[1]);
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
      "startDate": start,
      "endDate": end,
      "page": this.pageNumber,
      "pageSize": this.pageSize,
      "SearchKeyWord": this.searchKey
    }
    console.log(model);

    this._reports.GuardTasksReportGetAllForClientFilter(model).subscribe((res: any) => {
      console.log(res);
      this.missions = res.data
      this.allData = res.data
      this.total = res.totalCount;
    })

  }

  search() {
    this.pageNumber = 1;
    this.pageSize = 5
    this.getAllMissions();
  }

  details(mission: missionsReport, event: any) {
    event.stopImmediatePropagation();
    this.missionDetails = mission;
    this._CanvasService.open(this.messionID);
  }

  openGallery(gallery: any[], event: any) {
    this.selectedGallery = [];
    event.stopImmediatePropagation();
    console.log(gallery);
    gallery.forEach((ele) => {
      console.log(ele.photo.fullLink);
      this.selectedGallery.push(ele.photo.fullLink)
    })
    this.display = true;
  }



  deleteFilter() {
    this.filter = false;
    this.data = null
    this.Sites = null
    this.branches = null
    this.pageNumber = 1;
    this.pageSize = 5
    this.getAllMissions();
  }





  getTaskseBySiteId({ value }: any) {
    this.locationId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllMissions();
   // this.getBranches()
  }

  selectSecurity({ value }: any) {
    this.branchId = []
    this.locationId = []
    this.securityCompanyClientId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    if (this.isMainBranch) {
      if(this.branchFilter){
        console.log('barnchfilter');

        this.getAllMissions();
        this.branches = []
        this.getBranches();
      }else if(!this.branchFilter){
        console.log('sitefilter');

        this.getAllMissions();
        this.Sites=[];
        this.getAllSites();
      }
    } else if (!this.isMainBranch) {
      console.log(this.isMainBranch);
      this.getAllMissions();
      this.Sites=[];
      this.getAllSites();
    }
  }

  getByBranchId({ value }: any) {
    this.branchId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllMissions();
  }


  getDataFilter(filter: string) {
    this.filter = true;
    if (filter == 'branch') {
      this.clientFilter = true;
      this.branchFilter=true;
    } else if (filter == 'client') {
      this.clientFilter = true;
      this.branchFilter=false;
      // this.getClients();
    } else {
      this.dateFilter = true;
      this.clientFilter = false;
      this.branchFilter=false;
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

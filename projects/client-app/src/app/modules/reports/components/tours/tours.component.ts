import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TourReport } from '../../models/tours-reports';
import { ReportsService } from '../../services/reports.service';
import { CanvasService } from 'projects/tools/src/lib/services/canvas.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ModalService } from 'projects/tools/src/lib/services/modal.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { LangService, PAGINATION_SIZES, Roles, convertDateToString, language } from 'projects/tools/src/public-api';
import { eventListeners } from '@popperjs/core';
import { map } from 'rxjs';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
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
  tours!: any[];
  allData: any[] = [];
  tourID = "tourDetails";
  tourDetails!: any;
  checkPoints!: any;
  clientID!: any;
  display: boolean = false;
  selectedGallery!: any[];
  Sites!: any;
  securityCompanyClientId!: any;
  locationId!: any;
  branches!: any;
  branchId!: any;
  isMainBranch:boolean=false;
  branchFilter:boolean=false;
  constructor(private _reports: ReportsService, private localeService: BsLocaleService, public lang: LangService, public _CanvasService: CanvasService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer, private auth: AuthService, public _model: ModalService) {

  }

  ngOnInit(): void {
    this.initDatePiker();
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res) => {
        this.clientID = res?.id
        this.isMainBranch=true;
        this.onDateChange();
        this.getAllTours()
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
          this.getAllTours()
        }
      })
    }

  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAllTours();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getAllTours();
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
    //  this._reports.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.companyId).subscribe((res)=>{
    //    this.data = res;
    //  })


    if (this.clientID) {
      this._reports.GlobalApiFilterGetAllSecurityCompanyClientForUserClient(this.clientID).subscribe((res) => {
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
        this.getAllTours();
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

  getAllTours() {
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

    this._reports.GuardTourReportGetAllForClientFilter(model).subscribe((res: any) => {
      console.log(res);
      this.tours = res.data
      this.allData = res.data
      this.total = res.totalCount;
    })

  }

  safeCheckPointId(id: string): string {
    return 'id_' + id.replace(/[^a-zA-Z0-9]/g, '_');
  }

  search() {
    this.pageNumber = 1;
    this.pageSize = 5
    this.getAllTours();
  }

  details(tour: TourReport, event: any) {
    event.stopImmediatePropagation();
    this.tourDetails = tour;
    this.checkPoints = this.tourDetails.guardTourCheckPoints;
    this._model.open(this.tourID);
  }

  openGallery(gallery: any[]) {
    this.selectedGallery = [gallery];
    console.log(gallery);
    this._model.close(this.tourID);
    this.display = true;
  }


  deleteFilter() {
    this.filter = false;
    this.data = null
    this.Sites = null
    this.branches = null
    this.pageNumber = 1;
    this.pageSize = 5
    this.getAllTours();
  }





  getTaskseBySiteId({ value }: any) {
    this.locationId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllTours();
    //this.getBranches()
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

        this.getAllTours();
        this.branches = []
        this.getBranches();
      }else if(!this.branchFilter){
        console.log('sitefilter');

        this.getAllTours();
        this.Sites=[];
        this.getAllSites();
      }
    } else if (!this.isMainBranch) {
      console.log(this.isMainBranch);
      this.getAllTours();
      this.Sites=[];
      this.getAllSites();
    }
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
  getByBranchId({ value }: any) {
    this.branchId = [value.id]
    this.pageNumber = 1
    this.pageSize = 5
    this.getAllTours();
  }
}

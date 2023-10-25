import { Component, Input, OnInit } from '@angular/core';
import {
  LangService,
  Pagination,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { JobsService } from '../../services/jobs.service';
import { Gender, job, JobType } from './../../models/job';
declare var $: any;
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  constructor(
    private _JobsService: JobsService,
    public lang: LangService,
    private auth: AuthService
  ) {}
  jobs!: Pagination<job>;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  searchKey = '';
  allShiftTypes: any;
  alljobTypes: any;
  allGender: any;
  filter1: boolean = false;
  filter1Id: number = 0;
  filter2: boolean = false;
  filter2Id: number = 0;
  filter3: boolean = false;
  filter3Id: number = 0;
  filter4: boolean = false;
  filter4Id: number = 0;
  isLogin: boolean = false;
  ngOnInit(): void {
    if (this.auth.snapshot.userIdentity?.roles[0] == 'SecurityGurd') {
      this.isLogin = true;
    }

    this.getAll();
    this.jobType();
    this.shitType();
    this.Gender();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAll();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getAll();
  }
  getAll() {
    this.auth.userInfo.subscribe((res) => {

      let id = res?.id||' ';
      this._JobsService
        .getAllJobs(this.pageNumber, this.pageSize, id)
        .subscribe((res: any) => {
          this.jobs = res;
          if (this.filter1) {
            let all = this.jobs.data.filter((element) => {
              return element.jobType.id == this.filter1Id;
            });
            this.jobs.data = all;
            this.jobs.totalCount = all.length;
          }
          if (this.filter2) {
            let all = this.jobs.data.filter((element) => {
              return element.shiftType.id == this.filter2Id;
            });
            this.jobs.data = all;
            this.jobs.totalCount = all.length;
          }
          if (this.filter3) {
            let all = this.jobs.data.filter((element) => {
              return element.gender.id == this.filter3Id;
            });
            this.jobs.data = all;
            this.jobs.totalCount = all.length;
          }
          if (this.filter4 && this.filter4Id == 1) {
            for (const item of this.jobs.data) {
              let x = item.created.split(' ')[0].split('-')[0];
              let y = item.created.split(' ')[0].split('-')[1];
              let z = item.created.split(' ')[0].split('-')[2];
              let date =
                z + '-' + y + '-' + x + ' ' + item.created.split(' ')[1];

              item.created = date;
            }

            let all = this.jobs.data.sort(
              (a, b) =>
                new Date(a.created).valueOf() - new Date(b.created).valueOf()
            );
            this.jobs.data = all;
          }
          if (this.filter4 && this.filter4Id == 2) {
            for (const item of this.jobs.data) {
              let x = item.created.split(' ')[0].split('-')[0];
              let y = item.created.split(' ')[0].split('-')[1];
              let z = item.created.split(' ')[0].split('-')[2];
              let date =
                z + '-' + y + '-' + x + ' ' + item.created.split(' ')[1];

              item.created = date;
            }

            let all = this.jobs.data.sort(
              (a, b) =>
                new Date(b.created).valueOf() - new Date(a.created).valueOf()
            );
            this.jobs.data = all;
          }
        });
    });
  }
  jobType() {
    this._JobsService.getJobType().subscribe((res) => {
      this.alljobTypes = res;
    });
  }
  shitType() {
    this._JobsService.getJobShift().subscribe((res) => {
      this.allShiftTypes = res;
    });
  }
  Gender() {
    this._JobsService.getGender().subscribe((res) => {
      this.allGender = res;
    });
  }
  getData() {
    if ($('#filter1').val()) {
      this.filter1 = true;
      this.filter1Id = $('#filter1').val();
      this.getAll();
    }
    if ($('#filter2').val()) {
      this.filter2 = true;
      this.filter2Id = $('#filter2').val();
      this.getAll();
    }
    if ($('#filter3').val()) {
      this.filter3 = true;
      this.filter3Id = $('#filter3').val();
      this.getAll();
    }
    if ($('#filter4').val()) {
      this.filter4 = true;
      this.filter4Id = $('#filter4').val();
      this.getAll();
    }
  }
}

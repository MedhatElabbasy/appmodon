import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LangService,
  language,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { Pagination } from 'projects/tools/src/public-api';
import { job } from '../../../core/models/job';
import { Routing } from '../../../core/routes/app-routes';
import { JobsService } from '../../../core/services/jobs.service';

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.component.html',
  styleUrls: ['./job-requests.component.scss'],
})
export class JobRequestsComponent implements OnInit {
  companies!: Pagination<job>;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  isArabic!: boolean;
  constructor(
    private _JobsService: JobsService,
    private lang: LangService,
    private router: Router
  ) {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar ? true : false;
    });
  }
  @Input() id: number = 0;
  allData: any;
  ngOnInit(): void {
    this.getAllRequests();
  }
  getAllRequests() {
    this._JobsService
      .RequestsJob(this.id, this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.allData = res;
      });
  }
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getAllRequests();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getAllRequests();
  }
  getCard(id: number) {
    this.router.navigate([`${Routing.jobDetails}/${id}`]);
  }
}

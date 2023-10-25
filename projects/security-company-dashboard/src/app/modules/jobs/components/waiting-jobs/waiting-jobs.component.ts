import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LangService, Pagination, PAGINATION_SIZES, Roles } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Order, OrderList } from '../../../core/enums/order.enum';
import { Routing } from '../../../core/routes/app-routes';
import { AppUtilities } from '../../../core/utilities/app-utilities';
import { Job } from '../../models/job';
import { JobDetails } from '../../models/job-details.enum';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-waiting-jobs',
  templateUrl: './waiting-jobs.component.html',
  styleUrls: ['./waiting-jobs.component.scss'],
})
export class WaitingJobsComponent implements OnInit {
  jobs!: Pagination<JobDetails>;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  selectedJob!: Job | null;
  modalID = 'delete-job';
  isAr!: BehaviorSubject<boolean>;
  roles = Roles;
  searchKey = '';
  orderIndex = 0;
  orderList = [...OrderList];

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private auth: AuthService,
    private lang: LangService
  ) {
    this.isAr = this.lang.isAr;
  }

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.jobs = res['jobs'];
      this.total = this.jobs.totalCount;
      this.orderBy(this.orderIndex);
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getJobs();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getJobs();
  }

  getJobs() {
    let jobs$;
    if (this.auth.snapshot.userIdentity?.roles.includes(Roles.VirtualAdmin)) {
      jobs$ = this.jobService.getAllWaitingApproveByMain(
        this.pageNumber,
        this.pageSize
      );
    } else {
      jobs$ = this.jobService.getAllWaitingApproveByBranch(
        this.pageNumber,
        this.pageSize
      );
    }

    jobs$.subscribe((res) => {
      this.jobs = res;
      this.total = this.jobs.totalCount;
      this.orderBy(this.orderIndex);
    });
  }

  getJobDetails(id: any) {
    let url = `${Routing.dashboard}/${Routing.jobs.module}/${Routing.jobs.children.jobDetails}`;
    this.router.navigate([url, id]);
  }

  approve(id: number) {
    this.jobService.approveJob(id).subscribe(() => this.getJobs());
  }

  onOrderChange(event: any) {
    this.orderBy(event.target.value);
  }

  orderBy(event: any) {
    this.orderIndex = event;

    if (this.orderIndex) {
      if (this.orderIndex == Order.newest) {
        this.jobs.data.sort((a, b) => {
          let s: Date = AppUtilities.convertStringToDate(a.created);
          let e: Date = AppUtilities.convertStringToDate(b.created);

          return e.getTime() - s.getTime();
        });


      }

      if (this.orderIndex == Order.oldest) {
        this.jobs.data.sort((a, b) => {
          let s: Date = AppUtilities.convertStringToDate(a.created);
          let e: Date = AppUtilities.convertStringToDate(b.created);

          return s.getTime() - e.getTime();
        });

      }
    }
  }
}

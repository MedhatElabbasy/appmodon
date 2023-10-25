import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'projects/tools/src/lib/validators/custom-validators.class';
import { BehaviorSubject } from 'rxjs';
import {
  CanvasService,
  LangService,
  Lookup,
  ModalService,
  Pagination,
  PAGINATION_SIZES,
  Roles,
  SecurityCompany,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Order, OrderList } from '../../../core/enums/order.enum';
import { Routing } from '../../../core/routes/app-routes';
import { AppUtilities } from '../../../core/utilities/app-utilities';

import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs-grid',
  templateUrl: './jobs-grid.component.html',
  styleUrls: ['./jobs-grid.component.scss'],
})
export class JobsGridComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  jobTypes!: Lookup[];
  shifts!: Lookup[];
  genders!: Lookup[];
  company!: SecurityCompany;
  addJobCanvas = 'add-job';
  jobForm!: UntypedFormGroup;
  jobs!: Pagination<Job>;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  selectedJob!: Job | null;
  private Routing = Routing;
  modalID = 'delete-job';
  isAr!: BehaviorSubject<boolean>;
  successAlert = 'job-success-modal';
  searchKey = '';
  orderIndex = 0;
  orderList = [...OrderList];

  constructor(
    public canvas: CanvasService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private fb: UntypedFormBuilder,
    private job: JobService,
    private router: Router,
    private modal: ModalService,
    private lang: LangService
  ) {
    this.isAr = this.lang.isAr;
    this.generateJobForm();
  }

  get controls(): any {
    return this.jobForm.controls;
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    let data = this.route.snapshot.data['initData'];
    this.jobs = data.jobs;
    this.total = data.jobs.totalCount;
    this.jobTypes = data.jobTypes;
    this.genders = data.genders;
    this.shifts = data.shifts;
    this.company = this.auth.snapshot.userInfo!;
    this.job.updates.subscribe((res) => {
      this.jobs = res;
      this.orderBy(this.orderIndex);
    });
  }

  generateJobForm() {
    this.jobForm = this.fb.group({
      securityCompanyId: [null],
      jobTypeId: [null, [Validators.required]],
      jobDescription: [null, [Validators.required]],
      jobReqiurement: [null, [Validators.required]],
      jobDescriptionEN: [null, [Validators.required]],
      jobReqiurementEN: [null, [Validators.required]],
      locationName: [null, [Validators.required]],
      locationLng: [null, [Validators.required]],
      locationLat: [null, [Validators.required]],
      openJobNumber: [
        null,
        [Validators.required, Validators.pattern(/^[1-9][0-9]?$|^100$/)],
      ],
      shiftTypeId: [null, [Validators.required]],
      experinceReqiured: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/),
        ],
      ],
      genderId: [null, Validators.required],
    });
  }

  onLocationListener(event: {
    formatted_address: string;
    latLng: google.maps.LatLngLiteral;
  }) {
    if (event) {
      (this.controls['locationName'] as UntypedFormControl).patchValue(
        event.formatted_address
      );
      (this.controls['locationLng'] as UntypedFormControl).patchValue(
        event.latLng.lng
      );
      (this.controls['locationLat'] as UntypedFormControl).patchValue(
        event.latLng.lat
      );
    }
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getJobs();
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
    this.getJobs();
  }

  onEditMode(job: Job) {
    this.selectedJob = job;
    this.jobForm.patchValue(this.selectedJob);
    this.canvas.open(this.addJobCanvas);
  }

  onAddMode() {
    this.selectedJob = null;
    this.form.resetForm();
    this.canvas.open(this.addJobCanvas);
  }

  onDeleteMode(job: Job) {
    this.selectedJob = job;
    this.modal.open(this.modalID);
  }

  onDelete() {
    this.job.delete(this.selectedJob?.id);
    this.modal.close(this.modalID);
  }

  onSubmit() {
    if (this.jobForm.invalid) return;
    let model = this.jobForm.value;
    model.securityCompanyId = this.company.id;
    model.securityCompanyBranchId = this.company.securityCompanyBranch.id;

    if (this.selectedJob) {
      model.id = this.selectedJob.id;
      this.job.update(model);
    } else {
      this.job.add(model).subscribe(() => {
        this.getJobs();
        this.modal.open(this.successAlert);
      });
    }

    this.form.resetForm();
    this.selectedJob = null;
    this.canvas.close(this.addJobCanvas);
  }

  getJobDetails(id: any) {
    let url = `${Routing.dashboard}/${Routing.jobs.module}/${this.Routing.jobs.children.jobDetails}`;
    this.router.navigate([url, id]);
  }

  getJobs() {
    let jobs$;
    if (this.auth.snapshot.userIdentity?.roles.includes(Roles.VirtualAdmin)) {
      jobs$ = this.job.getAllApprovedByMainBranch(
        this.pageNumber,
        this.pageSize
      );
    } else {
      jobs$ = this.job.getAllApprovedByBranch(this.pageNumber, this.pageSize);
    }

    jobs$.subscribe((res) => {
      this.jobs = res;
      this.total = this.jobs.totalCount;
      this.orderBy(this.orderIndex);
    });
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

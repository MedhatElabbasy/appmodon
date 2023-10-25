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
import {
  CanvasService,
  LangService,
  language,
  Lookup,
  ModalService,
  Pagination,
  SecurityCompany,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Routing } from '../../../core/routes/app-routes';
import { Job } from '../../models/job';
import { Attachment, JobApplication } from '../../models/job-app';
import { JobDetails } from '../../models/job-details.enum';
import { JobService } from '../../services/job.service';
import { JopApplicationService } from '../../services/jop-application.service';
import { Location } from '@angular/common';
import { AcceptApplicationModel } from '../../models/accept-application-model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  company!: SecurityCompany;
  job!: JobDetails;
  isArabic!: boolean;
  jobApps!: JobApplication[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  selectedApp!: JobApplication;
  private jopId!: number;
  jobsLink = `${Routing.dashboard}/${Routing.jobs.module}/${Routing.jobs.children.jobsGrid}`;
  detailsID = 'application-details';
  editJob = 'edit-job-details';
  jobForm!: UntypedFormGroup;
  jobTypes!: Lookup[];
  shifts!: Lookup[];
  genders!: Lookup[];
  selectedJob!: Job | null;
  selectedAttachment!: Attachment;
  modalID = 'delete-job-details';
  successAlert = 'application-success-alert';
  successAlert2 = 'reject';
  searchKey = '';
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private lang: LangService,
    public canvas: CanvasService,
    private jobAppService: JopApplicationService,
    private fb: UntypedFormBuilder,
    private jobService: JobService,
    private modal: ModalService,
    private location: Location,
    private router: Router
  ) {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar;
    });

    this.generateJobForm();
  }

  ngOnInit() {
    this.getDetails();
  }

  get controls(): any {
    return this.jobForm.controls;
  }

  getDetails() {
    this.company = this.auth.snapshot.userInfo!;
    let data: {
      apps: Pagination<JobApplication>;
      details: JobDetails;
      jobTypes: Lookup[];
      genders: Lookup[];
      shifts: Lookup[];
    } = this.route.snapshot.data['details'];

    this.jopId = this.route.snapshot.params['id'];

    if (data) {
      this.job = data.details;
      this.jobApps = data.apps.data;
      this.total = data.apps.totalCount;
      this.jobTypes = data.jobTypes;
      this.genders = data.genders;
      this.shifts = data.shifts;
    }
  }

  getJobDetails() {
    this.jobService
      .getJobDetails(this.job.id)
      .subscribe((res) => (this.job = res));
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageChange(p: number) {
    this.pageNumber = p;
    this.getApps();
  }

  onEditMode() {
    this.jobForm.patchValue(this.job);
    this.canvas.open(this.editJob);
  }

  getApps() {
    this.jobAppService
      .getAllByJobId(this.pageNumber, this.pageSize, this.jopId)
      .subscribe((res) => {
        this.jobApps = res.data;
        this.total = res.totalCount;
      });
  }

  showAppDetails(app: JobApplication) {
    this.selectedApp = app;
    this.canvas.open(this.detailsID);
    this.selectedAttachment =
      this.selectedApp.jobApplicationAttachments[0]?.attachment;
   
  }

  generateJobForm() {
    this.jobForm = this.fb.group({
      securityCompanyId: [null],
      jobTypeId: [null, [Validators.required]],
      jobDescription: [null, [Validators.required]],
      jobReqiurement: [null, [Validators.required]],
      locationName: [null, [Validators.required]],
      locationLng: [null, [Validators.required]],
      locationLat: [null, [Validators.required]],
      jobDescriptionEN: [null, [Validators.required]],
      jobReqiurementEN: [null, [Validators.required]],
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

  onSubmit() {
    if (this.jobForm.invalid) return;
    let model = this.jobForm.value;
    model.securityCompanyId = this.company.id;
    model.id = this.job.id;
    this.jobService.updateJobDetails(model).subscribe((res) => {
      this.getJobDetails();
      this.form.resetForm();
      this.canvas.close(this.editJob);
    });
  }

  onDeleteMode() {
    this.modal.open(this.modalID);
  }

  onDelete() {
    this.modal.close(this.modalID);
    this.jobService.delete(this.job?.id);
    this.router.navigate([this.jobsLink]);
  }

  back() {
    this.location.back();
  }

  acceptGuardApplication(application: JobApplication) {
    let model: AcceptApplicationModel = {
      isActive: true,
      jobApplicationId: application.id,
      securityCompanyBranchId: this.job.securityCompanyBranchId,
      securityCompanyId: this.job.securityCompanyId,
      securityGuardId: application.securityGuardId,
    };

    this.jobAppService.acceptApplication(model).subscribe((res) => {
      this.canvas.close(this.detailsID);
      this.getApps();
      this.modal.open(this.successAlert);
    });
  }
  rejectGuardApplication(application: JobApplication) {
 
    this.jobAppService.rejectApplication(application.id).subscribe((res) => {
      if (res) {
        this.canvas.close(this.detailsID);
        this.getApps();
        this.modal.open(this.successAlert2);
      }
    });
  }
}

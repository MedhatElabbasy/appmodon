import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AcceptedFile,
  AcceptedImage,
  CanvasService,
  LookupService,
  ModalService,
} from 'projects/tools/src/public-api';
import { Lookup } from './../../../../client/models/lookup';
import { AuthService } from '../../../../auth/services/auth.service';
import { JobsService } from '../../../services/jobs.service';
import { AttachmentService } from 'projects/tools/src/lib/services/attachment.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  successAlert = 'done';
  oneJob: any;
  aboutFlag: boolean = true;
  companyFlag: boolean = false;
  isLogin = false;
  details = true;
  canvasId = 'add';
  allTimeType!: Lookup[];
  file!: string | null;
  myNumber: string = '';
  applyForm: FormGroup = this.fb.group({
    jobAttachmentsIds: [[], [Validators.required]],
    phone: ['', [Validators.required]],
    timeTypeId: [null, [Validators.required]],
    securityGuardId: 0,
    companyJobId: 0,
    notes: '',
  });
  get controls(): any {
    return this.applyForm.controls;
  }
  constructor(
    private _JobsService: JobsService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public canvas: CanvasService,
    private attachment: AttachmentService,
    private fb: FormBuilder,
    private lookup: LookupService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    if (this.auth.snapshot.userIdentity?.roles[0] == 'SecurityGurd') {
      this.isLogin = true;
    }
    this.getJob();
  }
  getJob() {
    this.route.params.subscribe((res) => {
      let id = res['id'];
      this._JobsService.getJob(id).subscribe((response) => {
        this.oneJob = response;
        this.controls['companyJobId'].setValue(res['id']);
      });
    });
  }
  about() {
    this.companyFlag = false;
    this.aboutFlag = true;
  }
  company() {
    this.aboutFlag = false;
    this.companyFlag = true;
  }
  opanCanvas() {
    this.auth.userInfo.subscribe((res: any) => {
      this.myNumber = res.appUser.userName;
      this.controls['phone'].setValue(this.myNumber);
      this.controls['securityGuardId'].setValue(res['id']);
    });
    this.lookup.getTimeType().subscribe((res) => {
      this.allTimeType = res;
    });
    this.canvas.open(this.canvasId);
  }
  onFileUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.controls['jobAttachmentsIds'] as FormControl).setErrors({
        notValid: true,
      });
      this.file = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.controls['jobAttachmentsIds'] as FormControl).setErrors({
        notValid: null,
      });
     
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.file = url;
          this.controls['jobAttachmentsIds'].setValue([res]);
        });
    }
  }
  check(id: number) {
    $('.my-btn').removeClass('bg-warning');
    $(`#${id}`).addClass('bg-warning');
    this.controls['timeTypeId'].setValue(id);
  }
  onSubmit(applyForm: FormGroup) {
    if (applyForm.invalid) return;
    this._JobsService.applay(applyForm).subscribe((res) => {
      if (res) {
        this.canvas.close(this.canvasId);
        this.modal.open(this.successAlert);
      }
    });
  }
  close() {
    this.canvas.close(this.canvasId);
  }
}

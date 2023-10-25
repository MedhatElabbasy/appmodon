import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentService } from 'projects/tools/src/lib/services/attachment.service';
import { LookupService } from 'projects/tools/src/lib/services/lookups.service';
import { CustomValidators } from 'projects/tools/src/lib/validators/custom-validators.class';
import { combineLatest, map } from 'rxjs';
import {
  AcceptedImage,
  CanvasService,
  LangService,
  language,
  Lookup,
} from 'projects/tools/src/public-api';
import { SecurityGuard } from '../../../auth/models/security-guard.model';
import { AuthService } from '../../../auth/services/auth.service';
import { GuardService } from '../../services/guard.service';
declare var $: any;
@Component({
  selector: 'app-guard-profile',
  templateUrl: './guard-profile.component.html',
  styleUrls: ['./guard-profile.component.scss'],
})
export class GuardProfileComponent implements OnInit {
  user!: SecurityGuard;
  qrCode!: string;

  canvasID = 'guard';
  myJobFlag: boolean = true;
  RequestsFlag: boolean = false;
  savedJobFlag: boolean = false;
  editUserForm!: FormGroup;
  isAr!: boolean;
  jobTypes!: Lookup[];
  bloodTypes!: Lookup[];
  genders!: Lookup[];
  cities!: Lookup[];
  nationalities!: Lookup[];

  profileImage!: string | null;

  constructor(
    private attachment: AttachmentService,
    private auth: AuthService,
    private canvasServices: CanvasService,
    private fb: FormBuilder,
    private lookup: LookupService,
    private guardServices: GuardService,
    private route: ActivatedRoute,
    private lang: LangService
  ) {
    this.editUserForm = this.fb.group({
      firstName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      nationalID: [
        null,
        [Validators.required, Validators.pattern('[1-2][\\d]{9}')],
      ],
      bloodTypeId: [null, [Validators.required]],
      genderId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      jobTypeId: [null, [Validators.required]],
      nationalityId: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      appUserId: [null, [Validators.required]],
      photoId: [null, [Validators.required]],
      isActive: [true],
      id: [0],
    });
    this.checkLang();
  }

  get controls(): any {
    return this.editUserForm.controls;
  }

  public get BirthDate(): FormControl {
    return this.editUserForm.get('birthDate') as FormControl;
  }
  getGuard() {
    this.auth.userInfo.subscribe((user) => {
      this.user = user as SecurityGuard;
    });
  }

  ngOnInit() {
    this.getInitData();
    this.getGuard();

    this.attachment.getQRCode().subscribe((res) => {
      this.qrCode = res;
    });
  }

  getInitData() {
    combineLatest([this.route.data])
      .pipe(map((res) => ({ data: res[0] })))
      .subscribe((response: { data: any }) => {
        let data = response.data.lookup;
        this.bloodTypes = [...data.bloodType];
        this.genders = [...data.gender];
        this.jobTypes = [...data.jobType];
        this.nationalities = [...data.nationality];
      });
  }

  loadCities(id: any) {
    this.lookup.getCity(id).subscribe((res) => {
      this.cities = res;
    });
  }

  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }

  openCanvas(id: string) {
    this.profileImage = null;
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }

  editGuard(guard: SecurityGuard) {
    // this.user = guard;

    let _guard = {
      ...guard,
      cityId: guard.city.id,
      nationalityId: guard.nationality.id,
      bloodTypeId: guard.bloodType.id,
      genderId: guard.gender.id,
      photoId: guard?.photo?.id,
    };

    this.editUserForm.patchValue(_guard);
    this.openCanvas(this.canvasID);
  }

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedImage.includes(extension)) {
      (this.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.controls['photoId'].setValue(res);
          this.profileImage = url;
        });
    }
  }

  onSubmit() {
    if (this.editUserForm.invalid) return;
    let modal = this.editUserForm.value;
    this.guardServices.update(modal).subscribe((res) => {
      this.closeCanvas(this.canvasID);
      this.auth.getGuardInfo();
    });
  }

  myJob() {
    this.RequestsFlag = false;
    this.myJobFlag = true;
    this.savedJobFlag = false;
    $('.change2').removeClass('bg-warning').addClass('bg-primary-o');
    $('.change3').removeClass('bg-warning').addClass('bg-primary-o');
    $('.change1').addClass('bg-warning').removeClass('bg-primary-o');
  }
  requestsJob() {
    this.myJobFlag = false;
    this.RequestsFlag = true;
    this.savedJobFlag = false;
    $('.change1').removeClass('bg-warning').addClass('bg-primary-o');
    $('.change3').removeClass('bg-warning').addClass('bg-primary-o');
    $('.change2').addClass('bg-warning').removeClass('bg-primary-o');
  }
  savedJob() {
    this.myJobFlag = false;
    this.RequestsFlag = false;
    this.savedJobFlag = true;
    $('.change1').removeClass('bg-warning').addClass('bg-primary-o');
    $('.change2').removeClass('bg-warning').addClass('bg-primary-o');
    $('.change3').addClass('bg-warning').removeClass('bg-primary-o');
  }
}

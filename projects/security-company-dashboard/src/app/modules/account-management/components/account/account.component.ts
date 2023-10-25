import { Lookup } from './../../../../../../../tools/src/lib/models/lookup';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from './../../../../../../../tools/src/lib/validators/custom-validators.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AcceptedImage,
  CanvasService,
  City,
  LangService,
  LookupService,
  SecurityCompany,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  editPersonCanvas = 'edit-person-canvas';
  company!: SecurityCompany;
  isAr!: BehaviorSubject<boolean>;
  personForm!: FormGroup;
  acceptedFiles = [...AcceptedImage];
  businessTypes!: Lookup[];
  cities!: City[];
  areas!: Lookup[];
  imagePath: string | null = '';
  constructor(
    private auth: AuthService,
    public lang: LangService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private canvas: CanvasService,
    private lookups: LookupService,
    private accountServices: AccountService
  ) {
    this.isAr = this.lang.isAr;
    this.auth.userInfo.subscribe((res) => {
      this.company = res!;
    });
    this.generatePersonForm();
  }

  ngOnInit() {
    this.route.data.subscribe((res) => {
      this.businessTypes = res['initData'].businessTypes;
      this.cities = res['initData'].cities;
    });

    this.lookups.getAreas(this.company.cityId.toString()).subscribe((res) => {
      this.areas = res;
    });
  }

  public get personControls(): any {
    return this.personForm.controls;
  }

  generatePersonForm() {
    this.personForm = this.fb.group({
      profileImageId: [null, Validators.required],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      cityId: [null, Validators.required],
      areaId: [null, Validators.required],
      businessTypeId: [null, Validators.required],
    });
  }

  editPersonProfile() {
    this.personForm.patchValue(this.company);
    this.imagePath = this.company?.profileImage?.fullLink;
    this.canvas.open(this.editPersonCanvas);
  }

  getArea() {
    this.lookups
      .getAreas(this.personControls['cityId'].value)
      .subscribe((res) => (this.areas = res));
  }

  updatePersonalInfo() {
    if (this.personForm.invalid) return;

    let model: SecurityCompany = this.personForm.value;
    model.id = this.company.id;
    model = { ...this.company, ...model };
    this.company.appUserId;
    this.accountServices.updateCompanyAccount(model).subscribe((res) => {
      this.auth.getSecurityCompany();
    });
  }
}

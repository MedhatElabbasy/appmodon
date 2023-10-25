import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Lookup, OptionSetService } from 'projects/tools/src/public-api';
import { LookupService } from './../../../../../../../tools/src/lib/services/lookups.service';
import { UpdateclientprofileService } from '../../services/updateclientprofile.service';
import { completeForm, convertConfigurationsToArray } from './form';
import { FormProvider } from '../../../auth/models/form-provider';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  providers: [{ provide: FormProvider, useClass: CompleteComponent }],
})
export class CompleteComponent
  extends FormProvider
  implements OnInit, OnDestroy
{
  stepIndex: number = 1;
  completeForm!: UntypedFormGroup;
  FormConfig = convertConfigurationsToArray(completeForm);
  optionSetItems!: any;
  optionSetItemsComissioner!: any;
  identity!: any;
  nationalities!: Lookup[];
  constructor(
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private Auth: AuthService,
    private _Clientprofile: UpdateclientprofileService,
    private optionSet: OptionSetService,
    private lookup: LookupService
  ) {
    super();
    this.identity = [
      { name: 'وطنية', nameEn: 'patriotism' },
      { name: 'إقامة', nameEn: 'Accommodation' },
    ];
    this.generateForm();
  }

  ngOnInit(): void {
    this._Clientprofile.stepNumber.next(1);
    this.getStepNumber();
    this.getHolderResponsibilities();
    this.getNationalities();
    this.getcomissionerResponsibilities();
  }
  getForm(): UntypedFormGroup {
    return this.completeForm;
  }
  getHolderResponsibilities() {
    this.optionSet
      .getOptionSetByName('holderresponsability')
      .subscribe((res) => {
        this.optionSetItems = res.optionSetItems;
      });
  }
  getcomissionerResponsibilities() {
    this.optionSet
      .getOptionSetByName('Comissionerresponsability')
      .subscribe((res) => {
        this.optionSetItemsComissioner = res.optionSetItems;
      });
  }
  getNationalities() {
    this.lookup.getNationality().subscribe((res) => {
      this.nationalities = res;
    });
  }
  generateForm() {
    const numbers = /^[0-9]{5,15}$/;
    
    // const fullNamePattern =
    //   /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$|^([\u0600-\u06FF]+|[\u0600-\u06FF]+\s{1}[\u0600-\u06FF]{1,}|[\u0600-\u06FF]+\s{1}[\u0600-\u06FF]{1,}\s{1}[\u0600-\u06FF]{1,}|[\u0600-\u06FF]+\s{1}[\u0600-\u06FF]{1,}\s{1}[\u0600-\u06FF]{1,}\s{1}[\u0600-\u06FF]{1,}|[\u0600-\u06FF]+\s{1}[\u0600-\u06FF]{1,}\s{1}[\u0600-\u06FF]{1,}\s{1}[\u0600-\u06FF]{1,}\s{1}[\u0600-\u06FF]{1,})$/;
    const fullNamePattern = /^[a-zA-Z\u0600-\u06FF,-\s\d][\s\d\a-zA-Z\u0600-\u06FF,-]*$/;
    this.completeForm = this.fb.group({
      company_details: this.fb.group({
        clientCompanyId: this.Auth.snapshot.userInfo?.id,
        companyClass: [null, [Validators.required]],
        companyType: [null, [Validators.required]],
        commercialRegisterNumber: [null,[Validators.required, Validators.pattern(`^[0-9]{10}$`)],],
        commercialRegisterStartDate: [null, [Validators.required]],
        commercialRegisterEndDate: [null, [Validators.required]],
        mianBranshCity:[null, [Validators.required]],
        activityLicenseNumber: [null,[Validators.required, Validators.pattern(`^[0-9]{5}$`)],],
        activeEndDate: [null, [Validators.required]],
        city: [null, [Validators.required]],
        district: [null, [Validators.required]],
        street: [null, [Validators.required]],
        postalCode: [null, [Validators.required, Validators.pattern(`^[0-9]{5}$`)]],
        unitNumber: [null, [Validators.required, Validators.pattern(/^[-a-zA-Z\u0621-\u064A0-9-()]+(\s+[-a-zA-Z\u0621-\u064A0-9-()]+)*$/)]],
        sadB:[null, [Validators.required, Validators.pattern(numbers)]],
        email: [null, [Validators.required, Validators.email ,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        phoneNumber:[null, [Validators.required, Validators.pattern(numbers)]],
        activityType:[null, [Validators.required]],
        others:[null, [Validators.required]]
      }),

      company_representative: this.fb.group({
        holderFullName: [null,[Validators.required, Validators.pattern(/[a-zA-Z\u0600-\u06FF,\s][\s\a-zA-Z\u0600-\u06FF]*$/)],],
        holderEmail: [null, [Validators.required, Validators.email ,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        holderIdentityType: [null, Validators.required],
        holderPhoneNumber: [null, Validators.required],
        holderNationality: [null, Validators.required],
        holderResponsablity: [null, Validators.required],
        holderIdentityNumber:  [null,[ Validators.required , Validators.pattern(`^[0-9]{10}$`)]]
      }),
      commissioner_representative: this.fb.group({
        delegatIdentityType: [null, Validators.required],
        delegatNationalty: [null, Validators.required],
        delegatFullName: [null,[Validators.required, Validators.pattern(/[a-zA-Z\u0600-\u06FF,\s][\s\a-zA-Z\u0600-\u06FF]*$/)]],
        delegatEmail: [null, [Validators.required, Validators.email ,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
        delegatPhoneNumber: [null, Validators.required],
        delegatResponsabilty: [null, Validators.required],
        delegatIdentityNumber:[null,[ Validators.required , Validators.pattern(`^[0-9]{10}$`)]]
      }),
    });
  }

  getStepNumber() {
    this._Clientprofile.stepNumber.subscribe((res) => {
      this.stepIndex = res;
    });
  }
  ngOnDestroy(): void {
    this._Clientprofile.stepNumber.next(0);
  }
}
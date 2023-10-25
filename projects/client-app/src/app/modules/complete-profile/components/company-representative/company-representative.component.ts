import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {
  CountryCode,
  LangService,
  language,
} from 'projects/tools/src/public-api';
import { FormProvider } from '../../../auth/models/form-provider';

import { completeForm, numberOfSteps } from '../complete/form';

import { LookupService } from './../../../../../../../tools/src/lib/services/lookups.service';
import { ActivatedRoute } from '@angular/router';
import { Lookup } from '../../../client/models/lookup';
import { UpdateclientprofileService } from '../../services/updateclientprofile.service';
@Component({
  selector: 'app-company-representative',
  templateUrl: './company-representative.component.html',
  styleUrls: ['./company-representative.component.scss'],
})
export class CompanyRepresentativeComponent implements OnInit {
  @Input() optionSetItems!: any;
  //@Input() identity!: any;
  @Input() nationalities!: Lookup[];
  codes!: any[];
  code = new FormControl(null, [Validators.required]);
  step!: any;
  length!: number;
  isAr!: boolean;
  nationality!:Lookup[]
  identity!: any;

  companyRepresesentativeForm!: UntypedFormGroup;
  constructor(
    private profileComplete: UpdateclientprofileService,
    private formProvider: FormProvider,
    private lookup: LookupService,
    private route: ActivatedRoute,
    public lang: LangService
  ) {
    this.checkLang();
    this.onCodeChange();
    this.getNationality()
    this.identity = [
      {  name: 'وطنية', nameEn: 'patriotism' },
      {  name: 'إقامة', nameEn: 'Accommodation' },
    ];
  }

  get MobileNumber(): any {
    return this.companyRepresesentativeForm.get('holderPhoneNumber');
  }
  onCodeChange() {
    this.code.valueChanges.subscribe((res) => {
      let code: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == res
      );
      this.MobileNumber.clearValidators();
      this.MobileNumber.updateValueAndValidity();

      this.MobileNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);
      this.MobileNumber.updateValueAndValidity();
    });
  }
  getNationality(){
    this.profileComplete.getNationalityAll().subscribe((res)=>{
      this.nationality=res;
      console.log(this.nationality);
      
    })
  }

  getInitData() {
    this.lookup.getCountriesCodes().subscribe((res: any) => {
      this.codes = res;
     

      let defaultCountry = this.codes.find((element: CountryCode) => {
        return element.ioS2 === '+966';
      });
      this.code.setValue(defaultCountry.prefixCode);
    });
  }
  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res == language.ar ? true : false;
    });
  }
  ngOnInit(): void {
    this.getInitData();
    this.step = completeForm.companyRepresentative;
    this.length = numberOfSteps();
    this.companyRepresesentativeForm = this.formProvider
      .getForm()
      .get(this.step.title) as UntypedFormGroup;
  }
  get controls(): any {
    return this.companyRepresesentativeForm.controls;
  }

  getData() {
    if (this.controls['holderIdentityType'].value == 'وطنية') {
      let id;
      this.nationality.find((ele) => {
        if (ele.name == 'السعودية') {
          this.controls['holderNationality'].setValue(ele.name)
        }
      })
    } else {
      this.nationality = this.nationality.filter(item => item.name != 'السعودية')
    
    }
  }
  onSubmit() {
    if (this.controls['holderIdentityType'].value == 'وطنية') {
      this.nationality.find((ele) => {
        if (ele.name == 'السعودية') {
          this.controls['holderNationality'].setValue(ele.name)
        }
      })
    }

    console.log(this.controls['holderNationality'].value);
    console.log(this.controls['holderIdentityType'].value);
    
    if (this.companyRepresesentativeForm.invalid) return;
    this.profileComplete.stepNumber.next(3);
  }
  previous() {
    this.profileComplete.stepNumber.next(1);
  }
}
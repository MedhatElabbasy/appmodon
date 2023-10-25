import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CountryCode, LangService, language, Lookup, LookupService, OptionSetItem, OptionSetService } from 'projects/tools/src/public-api';
import { FormProvider } from '../../../auth/models/form-provider';
import { UpdateclientprofileService } from '../../services/updateclientprofile.service';
import { completeForm, numberOfSteps } from '../complete/form';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  step!: any;
  length!: number;
  companyForm!: UntypedFormGroup;
  companyScales!:any;
  companyTypes!:Lookup[]
  cities!:Lookup[]
  isAr!: boolean;
  today!: Date;
  minDate!: Date;
  maxDate!: Date;
  disabledDates!:Date;
  codes!: any[];
  code = new FormControl(null, [Validators.required]);
  constructor(
    private profileComplete: UpdateclientprofileService,
    private formProvider: FormProvider,
    private _lookups:LookupService,
    public lang:LangService,
    private optionSet:OptionSetService
  ) { this.checkLang()
    this.onCodeChange();
    this.today = new Date();
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 2);
  }


  ngOnInit(): void {
    this.getInitData();
    this.getCompanyScale();
    this.getCompantType();
    this.getCompanyCity();
    this.step = completeForm.companyDetails;
    this.length = numberOfSteps();
    this.companyForm = this.formProvider
      .getForm()
      .get(this.step.title) as UntypedFormGroup;
  }


getCompanyScale(){
  this.optionSet
  .getOptionSetByName('companyclass')
  .subscribe((res) => {
    this.companyScales = res.optionSetItems;
    console.log(this.companyScales);
    
  });
}

getCompantType(){
  this.profileComplete.getCompanyGetAll().subscribe((res)=>{
    console.log("gggg");
    
    console.log(res);
    this.companyTypes=res
  })
}

getCompanyCity(){
  this.profileComplete.getCityGetAll().subscribe((res)=>{
    console.log(res);
    this.cities=res
  })
}

checkLang() {
  this.lang.language.subscribe((res) => {
    this.isAr = res == language.ar ? true : false;
  });
}


get MobileNumber(): any {
  return this.companyForm.get('phoneNumber');
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

getInitData() {
  this._lookups.getCountriesCodes().subscribe((res: any) => {
    this.codes = res;
    console.log(this.codes);

    let defaultCountry = this.codes.find((element: CountryCode) => {
      return element.ioS2 === '+966';
    });
    this.code.setValue(defaultCountry.prefixCode);
  });
}


  get controls(): any {
    return this.companyForm.controls;
  }
  onSubmit() {
    if (this.companyForm.invalid) return;
    this.profileComplete.stepNumber.next(2);
   
  }
}
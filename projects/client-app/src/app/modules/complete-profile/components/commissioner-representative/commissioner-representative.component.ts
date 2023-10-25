import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CountryCode,
  LangService,
  language,
  LookupService,
  ModalService,
  RequestsService,
} from 'projects/tools/src/public-api';
import { FormProvider } from '../../../auth/models/form-provider';
import { Lookup } from '../../../client/models/lookup';
import { checkclientprofile } from '../../../profile/services/clientprofile.service';
import { UpdateclientprofileService } from '../../services/updateclientprofile.service';
import { completeForm, numberOfSteps } from '../complete/form';
import { Routing } from './../../../core/routes/app-routes';

@Component({
  selector: 'app-commissioner-representative',
  templateUrl: './commissioner-representative.component.html',
  styleUrls: ['./commissioner-representative.component.scss'],
})
export class CommissionerRepresentativeComponent implements OnInit {
  @Input() optionSetItems!: any;
  @Input() identity!: any;
  @Input() nationalities!: Lookup[];
  codes!: any[];
  code = new FormControl(null, [Validators.required]);
  step!: any;
  length!: number;
  isAr!: boolean;
  modalId = 'done';
  modalDone = 'send';
  routing = Routing;
  model:any
  CommissionerRepresentativeForm!: UntypedFormGroup;
  nationality!:Lookup[]
  constructor(
    private profileComplete: UpdateclientprofileService,
    private formProvider: FormProvider,
    private lookup: LookupService,
    private router: Router,
    public lang: LangService,
    private modal: ModalService,
    private requests: RequestsService,
    private _clientprofile:checkclientprofile
  ) {
    this.checkLang();
    this.onCodeChange();
    this.getNationality()
  }

  get MobileNumber(): any {
    return this.CommissionerRepresentativeForm.get('delegatPhoneNumber');
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
    })
  }

  getInitData() {
    this.lookup.getCountriesCodes().subscribe((res: any) => {
      this.codes = res;
      console.log(this.codes);

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
    this.step = completeForm.commissionerRepresentative;
    this.length = numberOfSteps();
    this.CommissionerRepresentativeForm = this.formProvider
      .getForm()
      .get(this.step.title) as UntypedFormGroup;
  }
  get controls(): any {
    return this.CommissionerRepresentativeForm.controls;
  }



  getData() {
    if (this.controls['delegatIdentityType'].value == 'وطنية') {
      let id;
      this.nationality.find((ele) => {
        if (ele.name == 'السعودية') {
          this.controls['delegatNationalty'].setValue(ele.name)
        }
      })
    } else {
      this.nationality = this.nationality.filter(item => item.name != 'السعودية')
    console.log(this.nationality);
    
    }
  }



  onSubmit() {

    if (this.controls['delegatIdentityType'].value == 'وطنية') {
      this.nationality.find((ele) => {
        if (ele.name == 'السعودية') {
          this.controls['delegatNationalty'].setValue(ele.name)
        }
      })
    }

    if (this.CommissionerRepresentativeForm.invalid) return;
    let companyDetails = this.formProvider
    .getForm()
    .get(completeForm.companyDetails.title) as UntypedFormGroup;
  let companyRepresentative = this.formProvider
    .getForm()
    .get(completeForm.companyRepresentative.title) as UntypedFormGroup;
   let Delegatmodel: any = this.CommissionerRepresentativeForm.value;
   let holderModel :any = companyRepresentative.value;
   let clientModel :any = companyDetails.value;
   let prefixCode = this.code.value;
   let Delegatnumber: string = Delegatmodel.delegatPhoneNumber;
   let holderNumber :string = holderModel.holderPhoneNumber;
   let clientNumber :string = clientModel.phoneNumber;
   let holderFullName :string = holderModel.holderFullName.trim();
   holderModel.holderFullName=holderFullName;
   let delegatFullName:string = Delegatmodel.delegatFullName.trim();
   Delegatmodel.delegatFullName = delegatFullName;
   console.log(delegatFullName);
   console.log(holderFullName);
   
   
   console.log(Delegatnumber);
   
   let phoneCountry: CountryCode = this.codes.find(
     (e: CountryCode) => e.prefixCode == prefixCode
   );

   if (Delegatnumber.toString().startsWith('0')) {
    Delegatnumber = Delegatnumber.substring(1);
   }
   if (!Delegatmodel.delegatPhoneNumber.toString().startsWith(phoneCountry.prefixCode)) {
    Delegatmodel.delegatPhoneNumber = phoneCountry.prefixCode + Delegatnumber;
   }

   if (holderNumber.toString().startsWith('0')) {
    holderNumber = holderNumber.substring(1);
   }

   if (!holderModel.holderPhoneNumber.toString().startsWith(phoneCountry.prefixCode)) {
    holderModel.holderPhoneNumber = phoneCountry.prefixCode + holderNumber;
   }
   

   if (clientNumber.toString().startsWith('0')) {
    clientNumber = clientNumber.substring(1);
   }
   if (!clientModel.phoneNumber.toString().startsWith(phoneCountry.prefixCode)) {
    clientModel.phoneNumber = phoneCountry.prefixCode + clientNumber;
   }

    let data = {
      ...clientModel,
      ...holderModel,
      ...Delegatmodel
    };
      console.log(data);
      
    let model:any
    this.profileComplete.completeClientCompany(data).subscribe((res: any) => {
      console.log(res);
      
      if (res.id) {
        this.modal.open(this.modalId);
        this._clientprofile.model.subscribe((res)=>{
          model =res;
          console.log(model);
        })
        console.log(model);
        
        this.requests.add(model).subscribe((res)=>{
          console.log(res);
          this.modal.open(this.modalDone);
        })

      }
    });
  }

  closeModel(){
    this.modal.close(this.modalId);
    this.router.navigate([
      `/${this.routing.companies}`,
    ]);
  }
  clear() {
    this.modal.close(this.modalDone);
    this.router.navigate([
      `/${this.routing.companies}`,
    ]);
  }
  previous() {
    this.profileComplete.stepNumber.next(2);
  }
}
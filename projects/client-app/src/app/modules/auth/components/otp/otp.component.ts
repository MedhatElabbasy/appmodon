import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { environment } from 'projects/client-app/src/environments/environment';
import {
  CryptoService,
  ModalService,
  OtpModel,
  Roles,
  ValidateModel,
} from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { securityCompanyClient } from '../../../dashboard/models/attencereport';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @ViewChild('form', { static: true }) form!: FormGroupDirective;
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;

  loginModel!: OtpModel;
  otpForm!: FormGroup;
  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
  };
  authType!: string;
  modalID = 'otp-modal';
  modalID2 = 'otp-modal2';
  validationModal = 'validation-modal';
  isRegister!: boolean;
  message!: string;
  companyModelID = 'Choose-company'
  companies:any
  chosenCompany:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private crypto: CryptoService,
    private modal: ModalService
  ) {
    this.otpForm = this.fb.group({
      code: [
        null,
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
    });
  }

  ngOnInit() {
    this.getInitData();
  }

  get code(): FormControl | any {
    return this.otpForm.controls['code'];
  }

  getInitData() {
    this.route.params.subscribe((params) => {
      this.authType = params['type'];
      this.loginModel = JSON.parse(this.crypto.decrypt(params['phone']));
      this.isRegister = this.authType.includes('register');
    });
  }

  onSubmit() {
    if (this.otpForm.invalid) return;
    let model: ValidateModel = {
      mobileNumber: this.loginModel.mobileNumber,
      register: this.isRegister,
      otp: this.otpForm.value.code,
    };

    this.auth.validate(model).subscribe(
      (res) => {
        let url = '';
        let role = this.auth.snapshot.userIdentity?.role!;

        if (!this.route.snapshot.data['allowedRoles'].includes(role)) {
          this.modal.open(this.validationModal);
        } else {
          if (!(!this.isRegister && res.isProfileComplete)) {
            if (role == Roles.Company) {
              url = `/${Routing.auth.module}/${Routing.auth.children.facility}`;
            }
            if (role == Roles.SecurityGurd) {
              url = `/${Routing.auth.module}/${Routing.auth.children.register}`;
            }
            this.router.navigate([url]);
          } else {
            this.auth.getInfoBasedOnRole(this.auth.snapshot.userIdentity!);
            this.auth.userInfo.subscribe(() => {
              let user: any = this.auth.userInfo.getValue();
              if (user) {
                if (role == Roles.ClientCompanyUser) {
                  if (!user?.isActive || !user.clientCompanyBranch?.stauts) {
                    this.modal.open(this.modalID2);

                    this.auth.Navigate();
                  } else {
                    this.router.navigate([`/${Routing.dashboad.module}/${Routing.dashboad.children.dashboad}`]);
                  }
                } else if (role == Roles.Company) {
                  if (!user?.isActive) {
                    this.modal.open(this.modalID2);

                    this.auth.Navigate();
                  } else {
                    console.log(user);
                  // this.chooseCompany(user);
                   this.router.navigate([`/${Routing.dashboad.module}/${Routing.dashboad.children.dashboad}`]);
                  }
                } else {
                 this.router.navigate([`/${Routing.companies}`]);
                }
              }
            });
          }
        }
      },
      (error) => {
        this.message = error.message;
        this.modal.open(this.modalID);
      }
    );
  }

  resendOtp() {
    this.form.resetForm();
    this.ngOtpInput.setValue(null);
    this.loginModel.register = false;
    this.isRegister = false;
    this.auth.generateOTP(this.loginModel).subscribe(() => {});
  }

  redirectToDashboard() {
    this.auth.logout();
    window.location.replace(environment.loginLink);
  }
  redirect() {
    this.auth.logout();
  }

  // chooseCompany(user:any){
  //   this.modal.open(this.companyModelID)
  //   this.auth.getAllSecurityCompaniesByClientId(user.id,1,50).subscribe((res:any)=>{
  //     console.log(res.data);
  //     this.companies=res.data;
  //   })
  // }
  // redirectToCompany(company:any){
  //  this.chosenCompany=company;
  //  this.auth.chosenCopmanyID.next(this.chosenCompany.securityCompany.id)
  //  this.router.navigate([`/${Routing.companies}`]);
  // }

}

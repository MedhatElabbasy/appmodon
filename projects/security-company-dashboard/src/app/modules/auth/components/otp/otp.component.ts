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
import { environment } from 'projects/security-company-dashboard/src/environments/environment.staging';
import {
  CryptoService,
  ModalService,
  OtpModel,
  ValidateModel,
} from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { AuthOperations } from '../../enums/auth-operations.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  @ViewChild('form') form!: FormGroupDirective;
  loginModel!: OtpModel;
  otpForm!: FormGroup;
  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
  };
  message!: string;
  modalID = 'otp-modal';
  validationModal = 'validation-modal';
  isRegister!: boolean;

  get code(): FormControl | any {
    return this.otpForm.controls['code'];
  }

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

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    this.route.params.subscribe((params) => {
      this.loginModel = JSON.parse(this.crypto.decrypt(params['phone']));
      this.isRegister = params['type'] == AuthOperations.register;
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

        if (this.route.snapshot.data['allowedRoles'].includes(role)) {
          if (this.isRegister) {
            url = `/${Routing.auth.module}/${Routing.auth.children.register}`;
          } else {
            if (res.isProfileComplete) {
              url = `/${Routing.dashboard}`;
            } else {
              url = `/${Routing.auth.module}/${Routing.auth.children.register}`;
            }
          }

          this.router.navigate([url]);
        } else {
          this.modal.open(this.validationModal);
        }
      },
      (err) => {
        this.message = err.message;
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

  backToApp() {
    this.auth.logout();
    window.location.replace(environment.appLink);
  }
}

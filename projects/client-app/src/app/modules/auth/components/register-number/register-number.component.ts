import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthTypes } from 'projects/tools/src/public-api';
import {
  AuthTypeName,
  CountryCode,
  CryptoService,
  LangService,
  LookupService,
  ModalService,
  OtpModel,
  SecretKeys,
} from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-number',
  templateUrl: './register-number.component.html',
  styleUrls: ['./register-number.component.scss'],
})
export class RegisterNumberComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  key = SecretKeys.recaptcha;
  captcha: any = {
    theme: 'light',
    size: 'normal',
    type: 'image',
  };
  code = new FormControl(null, [Validators.required]);
  routing = Routing;
  registerForm!: FormGroup;
  registerType!: string;
  codes!: any;
  modalId = 'register-number-modal';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public lang: LangService,
    private lookups: LookupService,
    private crypto: CryptoService,
    private modal: ModalService
  ) {
    this.registerForm = this.fb.group({
      mobileNumber: [null, [Validators.required]],
      register: [true],
    });
  }

  get MobileNumber(): FormControl | any {
    return this.registerForm.controls['mobileNumber'];
  }

  get Recaptcha() {
    return this.registerForm.controls['recaptcha'] as FormControl;
  }

  ngOnInit() {
    this.getCountriesCodes();
    this.getAuthType();
    this.onPhoneValidatorListener();
  }

  getAuthType() {
    this.route.params.subscribe((params) => {
      this.registerType = params['type'];
    });
  }

  getCountriesCodes() {
    this.lookups.getCountriesCodes().subscribe((res) => {
      this.codes = [...res];
      let defaultCountry = this.codes.find((element: CountryCode) => {
        return element.ioS2 === '+966';
      });
      this.code.setValue(defaultCountry.prefixCode);
    });
  }

  onPhoneValidatorListener() {
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

  onSubmit() {
    if (this.registerForm.invalid) return;

    let prefixCode = this.code.value;
    let model: OtpModel = this.registerForm.value;
    let number: string = model.mobileNumber;
    let phoneCountry: CountryCode = this.codes.find(
      (e: CountryCode) => e.prefixCode == prefixCode
    );

    // process number with prefix
    model['phoneCountryId'] = phoneCountry.id;

    if (number.startsWith('0')) {
      number = number.substring(1);
    }

    // add account type to request
    if (!model.mobileNumber.startsWith(phoneCountry.prefixCode)) {
      model.mobileNumber = phoneCountry.prefixCode + number;
    }

    if (this.registerType == AuthTypeName.securityGuard) {
      model.authtype = AuthTypes.SecurityGuard;
    }

    if (this.registerType == AuthTypeName.registerClient) {
      model.authtype = AuthTypes.Company;
    }

    // go to register number
    this.auth.generateOTP(model).subscribe(
      (response) => {
        this.router.navigate([
          '/' + this.routing.auth.module + '/' + this.routing.auth.children.otp,
          this.registerType,
          this.crypto.encrypt(JSON.stringify(model)),
        ]);
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.modal.open(this.modalId);
      }
    );
  }

  resetForm() {
    this.form.resetForm();
  }
}

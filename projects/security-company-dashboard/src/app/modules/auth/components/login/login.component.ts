import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthTypeName,
  CountryCode,
  CryptoService,
  LangService,
  LookupService,
  ModalService,
  SecretKeys,
} from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { AuthOperations } from '../../enums/auth-operations.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  routing = Routing;
  loginForm!: FormGroup;
  key = SecretKeys.recaptcha;
  captcha: any = {
    theme: 'light',
    size: 'normal',
    type: 'image',
  };
  codes!: any;
  code = new FormControl(null, [Validators.required]);
  validModal = 'validation-modal';
  otpLink = `/${this.routing.auth.module}/${this.routing.auth.children.otp}`;
  register = `/${this.routing.auth.module}/${this.routing.auth.children.registerNumber}`;
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public lang: LangService,
    private lookups: LookupService,
    private crypto: CryptoService,
    private modal: ModalService
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: [null, [Validators.required]],
      register: [false],
    });

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

  ngOnInit() {
    this.lookups.getCountriesCodes().subscribe((res) => {
      this.codes = [...res];
      let defaultCountry = this.codes.find((element: CountryCode) => {
        return element.ioS2 === '+966';
      });
      this.code.setValue(defaultCountry.prefixCode);
    });
  }

  get MobileNumber(): FormControl | any {
    return this.loginForm.controls['mobileNumber'];
  }

  get Recaptcha() {
    return this.loginForm.controls['recaptcha'] as FormControl;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    let model = this.loginForm.value;
    let prefixCode = this.code.value;
    let number: string = model.mobileNumber;

    let phoneCountry: CountryCode = this.codes.find(
      (e: CountryCode) => e.prefixCode == prefixCode
    );

    model['phoneCountryId'] = phoneCountry.id;

    if (number.startsWith('0')) {
      number = number.substring(1);
    }

    if (!model.mobileNumber.startsWith(phoneCountry.prefixCode)) {
      model.mobileNumber = phoneCountry.prefixCode + number;
    }

    this.auth.generateOTP(model).subscribe(
      (res) => {
        this.router.navigate([
          '/' + this.routing.auth.module + '/' + this.routing.auth.children.otp,
          AuthOperations.login,
          this.crypto.encrypt(JSON.stringify(model)),
        ]);
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
        this.modal.open(this.validModal);
      }
    );
  }

  resetForm() {
    this.form.resetForm();
  }
}

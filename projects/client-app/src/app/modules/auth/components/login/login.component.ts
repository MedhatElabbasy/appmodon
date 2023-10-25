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
import { environment } from 'projects/client-app/src/environments/environment';
import {
  AuthTypeName,
  CanvasService,
  CountryCode,
  CryptoService,
  LangService,
  LookupService,
  ModalService,
  SecretKeys,
} from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
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
  otpLink = `/${this.routing.auth.module}/${this.routing.auth.children.otp}`;
  register = `/${this.routing.auth.module}/${this.routing.auth.children.accountType}`;
  canvasID = 'login-type';
  link = environment.loginLink;
  validModal = 'validation-modal';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public lang: LangService,
    private lookups: LookupService,
    private modal: ModalService,
    private crypto: CryptoService
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: [null, [Validators.required]],
      register: [false],
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

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.modal.open(this.canvasID);
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
          AuthTypeName.login,
          this.crypto.encrypt(JSON.stringify(model)),
        ]);
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.modal.open(this.validModal);
      }
    );
  }

  resetForm() {
    this.form.resetForm();
  }
}

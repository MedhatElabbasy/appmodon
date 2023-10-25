import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'projects/tools/src/lib/validators/custom-validators.class';
import {
  CountryCode,
  LangService,
  mapTheme,
  Regex,
} from 'projects/tools/src/public-api';

import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register-facility',
  templateUrl: './register-facility.component.html',
  styleUrls: ['./register-facility.component.scss'],
})
export class RegisterFacilityComponent implements OnInit {
  @ViewChild('successModal') modal!: ElementRef<HTMLButtonElement>;
  companyTypes!: any[];
  cities!: any[];
  codes!: any[];
  facilityForm!: FormGroup;
  code = new FormControl(null, [Validators.required]);
  manageLink!: string;
  coords!: any;
  mapOptions!: google.maps.MapOptions;
  isAr!: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private lang: LangService
  ) {
    this.isAr = this.lang.isAr;
    this.mapOptions = {
      styles: mapTheme,
      fullscreenControl: false,
      rotateControl: true,
      zoomControl: true,
      scrollwheel: false,
      disableDefaultUI: true,
      draggable: true,
      panControl: false,
      zoom: 10,
    };
    this.generateForm();
    this.onCodeChange();
  }

  ngOnInit() {
    this.getInitData();
  }

  get MobileNumber(): any {
    return this.facilityForm.get('chargePersonPhoneNumber');
  }

  get controls(): any {
    return this.facilityForm.controls;
  }

  getInitData() {
    this.route.data.subscribe((res: any) => {
      this.cities = [...res.lookup.city];
      this.companyTypes = [...res.lookup.companyType];
      this.codes = [...res.lookup.countryCode];
      let defaultCountry = this.codes.find((element: CountryCode) => {
        return element.ioS2 === '+966';
      });
      this.code.setValue(defaultCountry.prefixCode);
    });
  }

  generateForm() {
    let nameRegex = Regex.name;
    this.facilityForm = this.fb.group({
      name: [null, [Validators.required]],
      companyTypeId: [null, Validators.required],
      CommercialRegistrationNumber: [
        null,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      activityType: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      nationalAddress: [null, [Validators.required]],
      chargePerson: [
        null,
        [Validators.required, Validators.pattern(nameRegex)],
      ],
      chargePersonPhoneNumber: [null, Validators.required],
      cityId: [null, Validators.required],
      terms: [null, Validators.requiredTrue],
      description: [null, [Validators.required]],
      aboutCompany: [null, [Validators.required]],
      lat: [null, Validators.required],
      long: [null, Validators.required],
    });
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

  onSubmit() {
    if (this.facilityForm.invalid) return;
    let model: any = this.facilityForm.value;
    delete model.terms;

    let prefixCode = this.code.value;
    let number: string = model.chargePersonPhoneNumber;

    let phoneCountry: CountryCode = this.codes.find(
      (e: CountryCode) => e.prefixCode == prefixCode
    );

    if (number.startsWith('0')) {
      number = number.substring(1);
    }
    if (!model.chargePersonPhoneNumber.startsWith(phoneCountry.prefixCode)) {
      model.chargePersonPhoneNumber = phoneCountry.prefixCode + number;
    }

    this.auth.registerClientCompany(model).subscribe((response) => {
      this.auth.getClientInfo();
      this.modal.nativeElement.click();
    });
  }
  clickLocation(event: any) {
    this.coords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    this.facilityForm.controls['long'].setValue(this.coords.lng);
    this.facilityForm.controls['lat'].setValue(this.coords.lat);
  }
}

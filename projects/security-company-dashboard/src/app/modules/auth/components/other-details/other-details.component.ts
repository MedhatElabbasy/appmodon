import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService, language, Lookup } from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { FormProvider } from '../../models/form-provider';
import { CompanyRegisterForm, numberOfSteps } from '../register/form';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.scss'],
})
export class OtherDetailsComponent implements OnInit {
 // @Output() newItemEvent = new EventEmitter<any>();
  step = CompanyRegisterForm.otherDetails;
  length = numberOfSteps();
  module = `/${Routing.auth.module}/${Routing.auth.children.register}`;
  otherForm!: UntypedFormGroup;
  scale!: Lookup[];
  services!: Lookup[];
  isAr!: boolean;

  get controls(): any {
    return this.otherForm.controls;
  }

  constructor(
    private formProvider: FormProvider,
    private route: ActivatedRoute,
    private router: Router,
    private lang: LangService
  ) {
    this.otherForm = this.formProvider
      .getForm()
      .get(this.step.key) as UntypedFormGroup;
    this.checkPrev();
  }

  ngOnInit(): void {
    this.checkLang();
    this.getInitData();
  }

  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }

  getInitData() {
    this.route.data.subscribe((res: any) => {
      this.scale = [...res.initData.scale];
      this.services = [...res.initData.services];
    });
  }

  checkPrev() {
    if (this.formProvider.getForm().get(this.step.prev)?.valid) {
      return;
    } else {
      let url = `${this.module}/${this.step.prev}`;
      this.router.navigate([url]);
    }
  }

  onLocationListener(event: {
    formatted_address: string;
    latLng: google.maps.LatLngLiteral;
  }) {
    if (event) {
      (this.controls['address'] as UntypedFormControl).patchValue(
        event.formatted_address
      );
      (this.controls['locationLng'] as UntypedFormControl).patchValue(
        event.latLng.lng
      );
      (this.controls['locationLat'] as UntypedFormControl).patchValue(
        event.latLng.lat
      );
    }
  }

  onSubmit() {
    if (this.otherForm.invalid) return;

    if (this.step.next) {
      let url = `${this.module}/${this.step.next}`;
      this.router.navigate([url]);
    }
  }
 /* addNewUrl(value: any) {
    this.newItemEvent.emit(value);
  }*/
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  AcceptedFile,
  AttachmentService,
  CanvasService,
  CountryCode,
  LookupService,
  ModalService,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { EmergencyContactRoutesList } from '../../routes/settings-routes.enum';
import { EmergencyContactService } from '../../services/emergency-contact.service';
import { EmergencyContact } from './../../models/EmergencyContact';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  list = [...EmergencyContactRoutesList];
  canvasId = 'add-emergencyContact';
  successAlert = 'successAlert';
  Image!: string | null;
  contactForm!: FormGroup;
  codes!: any;
  code = new FormControl(null, [Validators.required]);
  isEdit: boolean = false;
  id!: string;
  constructor(
    public canvas: CanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private modal: ModalService,
    private auth: AuthService,
    private lookups: LookupService,
    private _EmergencyContactService: EmergencyContactService
  ) {
    this.contactForm = this.fb.group({
      photoId: [null, [Validators.required]],
      number: [null, [Validators.required]],
      securityCompanyId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.onUpdate();
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
  get controls(): any {
    return this.contactForm.controls;
  }

  get MobileNumber(): FormControl | any {
    return this.contactForm.controls['number'];
  }
  add() {
    this._EmergencyContactService.updateItem.next(null);
    this.isEdit = false;
    this.reset();
    this.canvas.open(this.canvasId);
  }
  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.Image = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);

      (this.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      this.Image = url;
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.controls['photoId'].setValue(res);
        });
    }
  }

  onSubmit(contactForm: FormGroup) {
    let companyID = this.auth.snapshot.userInfo?.id;
    this.controls['securityCompanyId'].setValue(companyID);
    if (contactForm.invalid) return;
    if (!this.isEdit) {
      this.doAdd();
    } else {
      this.doUpdate();
    }
  }
  reset() {
    this.Image = null;
    this.form?.resetForm();
  }
  onUpdate() {
    this._EmergencyContactService.updateItem.subscribe(() => {
      let data = this._EmergencyContactService.updateItem.getValue();
      if (data) {
        this.isEdit = true;
        this.controls['photoId'].setValue(data.photoId);
        this.controls['securityCompanyId'].setValue(data.securityCompanyId);
        this.controls['number'].setValue(data.number);
        this.id = data.id;
        this.Image = data.photo.fullLink;
        this.canvas.open(this.canvasId);
      }
    });
  }
  doAdd() {
    this._EmergencyContactService
      .addEmergencyContact(this.contactForm)
      .subscribe((res) => {
        if (res) {
          this._EmergencyContactService.addItem.next(res);
          this.canvas.close(this.canvasId);
          this.reset();
          this.modal.open(this.successAlert);
        }
      });
  }
  doUpdate() {
    let model: EmergencyContact = this.contactForm.value;
    model.id = this.id;
    this._EmergencyContactService
      .updateEmergencyContact(model)
      .subscribe((res) => {
        if (res) {
          this._EmergencyContactService.addItem.next(res);
          this.canvas.close(this.canvasId);
          this.reset();
          this.modal.open(this.successAlert);
        }
      });
  }
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  ModalService,
  Regex,
  language,
  CountryCode,
} from 'projects/tools/src/public-api';
import { AccountService } from '../account-management/services/account.service';
import { GuardsRoutesList } from './routes/guards-routes.enum';
import { combineLatest, elementAt, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'projects/tools/src/lib/validators/custom-validators.class';
import { Lookup } from 'projects/tools/src/lib/models/lookup';
import { LangService } from 'projects/tools/src/lib/services/lang.service';
import { LookupService } from 'projects/tools/src/lib/services/lookups.service';
import { AuthService } from '../auth/services/auth.service';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateType } from 'ngx-hijri-gregorian-datepicker';
import { CompanyGuardsService } from './services/company-guards.service';
declare var $: any;
@Component({
  selector: 'app-guards',
  templateUrl: './guards.component.html',
  styleUrls: ['./guards.component.scss'],
})
export class GuardsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  list = [...GuardsRoutesList];
  canvasId = 'add-user';
  modalId = 'select';
  modalId2 = 'upload';
  date!: NgbDate;
  selectedDate!: NgbDateStruct;
  guardForm!: FormGroup;
  bloodTypes: any[] = [];
  genders: any[] = [];
  cities: any[] = [];
  nationalities: any[] = [];
  jobTypes: any[] = [];
  isAr!: boolean;
  code = new FormControl('', [Validators.required]);
  codes: CountryCode[] = [];
  profileImage!: string | null;
  messageAR: string = '';
  messageEN: string = '';
  idFile: any;
  companyId: any;
  constructor(
    public canvas: CanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private modal: ModalService,
    private lookup: LookupService,
    private accountServices: AccountService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private lang: LangService,
    public _CompanyGuardsService: CompanyGuardsService,
    private cdr: ChangeDetectorRef //private islam:IslamicDateComponent
  ) {
    this.generateguardForm();
    this.checkLang();
  }

  get controls(): any {
    return this.guardForm.controls;
  }

  get phoneNumber(): FormControl | any {
    return this.guardForm.controls['phoneNumber'];
  }

  ngOnInit(): void {
    this.generateguardForm();
    this.getInitData();
  }

  onAdd() {
    this.cdr.detectChanges();
    this.canvas.open(this.canvasId);
  }
  generateguardForm() {
    let httpRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    let nameRegex = Regex.name;
    this.guardForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern(nameRegex)]],
      middleName: ['', [Validators.required, Validators.pattern(nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(nameRegex)]],
      nationalID: [null, [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      genderId: ['', [Validators.required]],
      bloodTypeId: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      jobTypeId: ['', [Validators.required]],
      photoId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      securityCompanyBranchId: [null],
      securityCompanyId: [null],
    });
  }

  mobileValidationListener() {
    this.code.valueChanges.subscribe((res) => {
      let code: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == res
      )!;

      this.phoneNumber.clearValidators();
      this.phoneNumber.updateValueAndValidity();

      this.phoneNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);
      this.phoneNumber.updateValueAndValidity();
    });
  }

  setDefaultCode() {
    let defaultCountry = this.codes.find((element: CountryCode) => {
      return element.ioS2 === '+966';
    })!;
    this.code.setValue(defaultCountry.prefixCode);
  }

  loadCities(id: any) {
    this.lookup.getCity(id).subscribe((res) => {
      this.cities = res;
    });
  }

  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }

  public get BirthDate(): FormControl {
    return this.guardForm.get('birthDate') as FormControl;
  }

  getInitData() {
    this.lookup.getGender().subscribe((x) => {
      x.forEach((element) => {
        this.genders.push(element);
      });
    });

    this.lookup.getBloodType().subscribe((x) => {
      x.forEach((element) => {
        this.bloodTypes.push(element);
      });
    });

    this.lookup.getCity().subscribe((x) => {
      x.forEach((element) => {
        this.cities.push(element);
      });
    });

    this.lookup.getNationality().subscribe((x) => {
      x.forEach((element) => {
        this.nationalities.push(element);
      });
    });

    this.lookup.getJobType().subscribe((x) => {
      x.forEach((element) => {
        this.jobTypes.push(element);
      });
    });
    this.lookup.getCountriesCodes().subscribe((x) => {
      x.forEach((element) => {
        this.codes.push(element);
      });
      this.setDefaultCode();
    });

    this.mobileValidationListener();
  }

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);

      (this.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      this.profileImage = url;
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.controls['photoId'].setValue(res);
        });
    }
  }

  onSubmit(guardForm: any) {
    guardForm.controls.securityCompanyId.setValue(
      this.auth.snapshot.userInfo?.id
    );
    guardForm.controls.securityCompanyBranchId.setValue(
      this.auth.snapshot.userInfo?.securityCompanyBranch.id
    );

    if (guardForm.invalid) {
      return;
    } else {
      let model = this.guardForm.value;
      let prefixCode = this.code.value;
      let number: string = model.phoneNumber;

      let phoneCountry: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == prefixCode
      )!;

      if (number.startsWith('0')) {
        number = number.substring(1);
      }

      if (!model.phoneNumber.startsWith(phoneCountry.prefixCode)) {
        model.phoneNumber = phoneCountry.prefixCode + number;
      }

      this.lookup.postGuradForm(model).subscribe((res) => {
        if (res.id) {
          this.canvas.close(this.canvasId);
          location.reload();
        }
      });
    }
  }
  reset() {
    this.generateguardForm();
    this.cdr.detectChanges();
    this.profileImage = null;
  }
  select() {
    this.modal.open(this.modalId);
  }
  cancel() {
    this.modal.close(this.modalId);
  }
  cancel2() {
    this.modal.close(this.modalId2);
  }
  upload() {
    this.cancel();
    this.modal.open(this.modalId2);
  }
  uploadFile(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');

    if (!arr.includes('xlsx')) {
      this.messageEN = 'please select excel file';
      return;
    } else {
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          if (res) {
            this.idFile = res.toString();
            this.companyId = this.auth.snapshot.userInfo?.id;
            this._CompanyGuardsService
              .uploadFile(this.idFile, this.companyId)
              .subscribe((res) => {
                this.cancel2();
              });
          }
        });
    }
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AcceptedFile,
  AttachmentService,
  CanvasService,
  CountryCode,
  LangService,
  language,
  LookupService,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { agentRoutesList } from '../../routes/agent-routes';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
  links = [...agentRoutesList];
 /* canvasId = 'form';
  agentForm!: FormGroup;
  bloodTypes: any[] = [];
  genders: any[] = [];
  cities: any[] = [];
  countries: any[] = [];
  nationalities: any[] = [];
  jobTypes: any[] = [];
  isAr!: boolean;
  code = new FormControl('', [Validators.required]);
  codes: CountryCode[] = [];
  profileImage!: string | null;
  messageAR: string = '';
  messageEN: string = '';
  idFile: any;
  companyId: any;*/
  constructor(
   /* public canvas: CanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private lookup: LookupService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private lang: LangService,
    private cdr: ChangeDetectorRef //private islam:IslamicDateComponent*/
  ) {}

  ngOnInit(): void {
   /* this.loadCountries();
    this.generateagentForm();
    this.checkLang();
    this.getInitData();*/
  }
 /* get controls(): any {
    return this.agentForm.controls;
  }
  get MobileNumber(): FormControl | any {
    return this.agentForm.controls['phoneNumber'];
  }
  onAdd() {
    this.generateagentForm();
    this.cdr.detectChanges();
    this.canvas.open(this.canvasId);
  }
  generateagentForm() {
    this.agentForm = this.fb.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.pattern(
            `^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`
          ),
        ],
      ],
      middleName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            `^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`
          ),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            `^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`
          ),
        ],
      ],
      nationalID: [null, [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      genderId: ['', [Validators.required]],
      bloodTypeId: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      jobTypeId: ['', [Validators.required]],
      photoId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      securityCompanyId: [null],
    });
  }

  mobileValidationListener() {
    this.code.valueChanges.subscribe((res) => {
      let code: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == res
      )!;

      this.MobileNumber.clearValidators();
      this.MobileNumber.updateValueAndValidity();

      this.MobileNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);
      this.MobileNumber.updateValueAndValidity();
    });
  }

  setDefaultCode() {
    let defaultCountry = this.codes.find((element: CountryCode) => {
      console.log(element);

      return element.ioS2 === '+966';
    })!;
    this.code.setValue(defaultCountry.prefixCode);
  }

  loadCities(id: any) {
    this.lookup.getCity(id).subscribe((res) => {
      this.cities = res;
    });
  }
  loadCountries() {
    this.lookup.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }

  public get BirthDate(): FormControl {
    return this.agentForm.get('birthDate') as FormControl;
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
  reset() {
    this.generateagentForm();
    this.cdr.detectChanges();
    this.profileImage = null;
  }*/
}

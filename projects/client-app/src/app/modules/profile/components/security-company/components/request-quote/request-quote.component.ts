import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormGroupDirective,
  NonNullableFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AuthService } from 'projects/client-app/src/app/modules/auth/services/auth.service';
import { Routing } from 'projects/client-app/src/app/modules/core/routes/app-routes';

import { BehaviorSubject } from 'rxjs';
import {
  ClientCompany,
  convertDateToString,
  LangService,
  language,
  Lookup,
  ModalService,
  OptionSet,
  OptionSetItem,
  RequestsService,
  Roles,
  SecurityCompany,
} from 'projects/tools/src/public-api';
import { checkclientprofile } from '../../../../services/clientprofile.service';
import { RouterDirection } from '@ionic/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../../services/client.service';
import { NotificationService } from 'projects/client-app/src/app/modules/core/services/notifications.service';

@Component({
  selector: 'app-request-quote',
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.scss'],
})
export class RequestQuoteComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  @Input('contractTypes') contractTypes!: any;
  @Input('shifts') shifts!: Lookup[];
  @Input('companyId') companyId!: SecurityCompany;
  requestForm!: FormGroup;
  allowed: boolean = true;
  jobTypes!: Lookup[]
  login = `/${Routing.auth.module}/${Routing.auth.children.login}`;
  minDate!: Date;
  maxDate!: Date;
  minDate2!: Date;
  isAr: BehaviorSubject<boolean>;
  hidden: boolean = false;
  modalId = 'request-modal';
  modalcompleteID = "completeProfila"

  constructor(
    private auth: AuthService,
    private fb: NonNullableFormBuilder,
    private lang: LangService,
    private localeService: BsLocaleService,
    private requests: RequestsService,
    private modal: ModalService,
    private _checkclientprofile: checkclientprofile,
    private client: ClientService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.isAr = this.lang.isAr;

    this.generateForm();
    this.startDateListener();
  }

  public get controls() {
    return this.requestForm.controls as any;
  }

  ngOnInit() {
    this.jobsTypes()
    this.requestForm.controls['email'].disable();
    this.initDatePiker();
    this.auth.userIdentity.subscribe((user) => {
      if (!user) {
        this.allowed = false;
      }
      if (
        (user && user.role == Roles.Company) ||
        (user && user.roles[0] == Roles.ClientCompanyUser)
      ) {
        this.allowed = true;
      }
      if (user && user.role != Roles.Company) {
        this.hidden = true;
      }
      if (user && user.roles[0] == Roles.ClientCompanyUser) {
        this.hidden = false;
      }
    });
    console.log(this.companyId);

  }
  jobsTypes() {
    this.client.jobType().subscribe((res: any) => {
      let arr: Lookup[] = [];
      res.forEach((element: any) => {
        if (element.id == 1 || element.id == 3) {
          arr.push(element)
        }

      });

      this.jobTypes = arr
    })
  }
  initDatePiker() {
    this.minDate = new Date();
    defineLocale('ar', arLocale);
    defineLocale('en', enGbLocale);
    this.lang.language.subscribe((res) => {
      res === language.ar
        ? this.localeService.use('ar')
        : this.localeService.use('en');
    });
  }

  generateForm() {
    this.requestForm = this.fb.group({
      email: [
        this.auth.snapshot.userInfo?.email,
        [Validators.required, Validators.email],
      ],
      location: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      // numberOfGurads: [null],
      // numberOfSupervisors: [null],
      // shiftTypeId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: ['', [Validators.required]],
      contractTypeId: ['', [Validators.required]],
      clientOrderGuardsShifts: this.fb.array([
        this.fb.group({
          shiftTypeId: ['', [Validators.required]],
          jobTypeId: ['', [Validators.required]],
          number: ['', [Validators.required, Validators.min(1)]],
        }),
      ]),
    });
  }
  get clientOrderGuardsShifts(): FormArray {
    return this.requestForm.get('clientOrderGuardsShifts') as FormArray;
  }

  // add shift
  addShift() {
    let shift = this.fb.group({
      shiftTypeId: ['', [Validators.required]],
      jobTypeId: ['', [Validators.required]],
      number: ['', [Validators.required]],
    })

    this.clientOrderGuardsShifts.push(shift);
  }

  // remove shift
  removeShift(index: number) {
    this.clientOrderGuardsShifts.removeAt(index);
  }
  startDateListener() {
    this.requestForm.get('startDate')?.valueChanges.subscribe((val: Date) => {
      this.minDate2 = new Date();
      this.minDate2.setDate(val.getDate() + 1);
    });
  }

  createRequest() {
    if (this.requestForm.invalid) return;
    let data: any = this.auth.snapshot.userInfo;
    this._checkclientprofile.checkClientProfile(data.id).subscribe((res) => {

      console.log(res);

      let model = this.requestForm.value;
      let guard = 0;
      let supervisor = 0;
      model.clientOrderGuardsShifts.forEach((element: any) => {
        if (element.jobTypeId == 3) {
          guard += element.number
        } else {
          supervisor += element.number
        }
      })
      model.numberOfGurads = guard
      model.numberOfSupervisors = supervisor
      if (this.auth.snapshot.userIdentity?.role == Roles.ClientCompanyUser) {

        console.log(data);

        model.clientCompanyId = data?.clientCompanyBranch?.clientCompanyId;
      } else {
        console.log((this.auth.snapshot.userInfo as ClientCompany).id);

        model.clientCompanyId = (this.auth.snapshot.userInfo as ClientCompany).id;
      }
      console.log(this.companyId);

      model.securityCompanyId = this.companyId.id;

      model.startDate = convertDateToString(model.startDate);
      model.endDate = convertDateToString(model.endDate);


      if (!res) {
        this.modal.open(this.modalcompleteID)
        this.requestForm.reset();
        this._checkclientprofile.model.next(model)
        console.log("request false");

      } else {
        this.requests.add(model).subscribe((res: any) => {
          let notification = {
            titile: "تم تقديم طلب جديد",
            titileEn: "A new request has been submitted",
            description: "برجاء مراجعة طلبات العملاء الجديدة",
            descriptionEn: "Please check new customer orders",
            appUserId: (this.auth.snapshot.userInfo as ClientCompany).appUserId,
            securityCompanyId: this.companyId?.id,
            securityCompanyBranchId: this.companyId.securityCompanyBranch?.id
          }
          this.notification.addNotify(notification).subscribe((res) => {

          })

        })
        this.modal.open(this.modalId)
      }
    })
  }



  clear() {
    this.form.resetForm()
    this.router.navigate([`/${Routing.companies}`])
  }


  completeProfileRouting() {
    this.router.navigate([`/${Routing.completeProfile.module}/${Routing.completeProfile.children.completeProfile}`,]);
  }
}

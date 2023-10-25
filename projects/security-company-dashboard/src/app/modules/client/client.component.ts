import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import {
  AcceptedFile,
  AttachmentService,
  CanvasService,
  LangService,
  language,
  LookupService,
  OptionSetService,
  Regex,
} from 'projects/tools/src/public-api';
import { ClientRoutesList } from './routes/clients-routes.enum';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { ClientsService } from './services/clients.service';
declare var $: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  isAr!: boolean;
  links = [...ClientRoutesList];
  title: BehaviorSubject<string> = CLIENTS_MODULE_TITLE;
  canvasId = 'addClient';
  image!: string | null;
  clients: any[] = [];
  contract: any;
  constructor(
    public canvas: CanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private auth: AuthService,
    private _OptionSetService: OptionSetService,
    private _ClientService: ClientsService,
    private lang: LangService
  ) {}

  clientForm: FormGroup = this.fb.group({
    clientCompanyName: [
      '',
      [Validators.required, Validators.pattern(Regex.name)],
    ],
    oldContractFileId: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    securityCompanyId: ['', [Validators.required]],
    contractTypeId: ['', [Validators.required]],
    contractStatusId: ['', [Validators.required]],
    securityCompanyBranchId: ['', [Validators.required]],
    isNotRegisteredClientCompany: true,
    isOldContract: true,
  });
  ngOnInit(): void {
    this.checkLang();
  }

  contructTypeId() {
    this._OptionSetService
      .getOptionSetByName('ContractType')
      .subscribe((res) => {
        this.contract = res.optionSetItems;
      });
  }
  contructStatusId() {
    this._OptionSetService
      .getOptionSetByName('ContractStatus')
      .subscribe((res) => {
        let myOption;
        let optionSet = res.optionSetItems;
        myOption = optionSet?.find((element) => {
          return element.value == 2;
        });

        this.clientForm.controls['contractStatusId'].setValue(myOption?.id);
      });
  }

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.clientForm.controls['oldContractFileId'] as FormControl).setErrors({
        notValid: true,
      });
      this.image = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);

      (this.clientForm.controls['oldContractFileId'] as FormControl).setErrors({
        notValid: null,
      });
      this.image = url;

      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.clientForm.controls['oldContractFileId'].setValue(res);
        });
    }
  }

  onAdd() {
    this.canvas.open(this.canvasId);
    this.image = null;

    this.clientForm.controls['securityCompanyId'].setValue(
      this.auth.snapshot.userInfo?.id
    );

    this.clientForm.controls['securityCompanyBranchId'].setValue(
      this.auth.snapshot.userInfo?.securityCompanyBranch.id
    );
    this.contructTypeId();
    this.contructStatusId();
  }
  exit() {
    this.image = '';
    this.clientForm.reset();
  }
  onSubmit(data: FormGroup) {
    this.clientForm.controls['contractTypeId'].setValue($('#contract').val());
    if (data.invalid) {
      return;
    } else {
      this._ClientService.createContract(data).subscribe((res) => {
        if (res) {
          let object = {
            clientCompanyId: res.clientCompany.id,
            securityCompanyId:
              this.clientForm.controls['securityCompanyId'].value,
            securityCompanyBranchId:
              this.clientForm.controls['securityCompanyBranchId'].value,
          };
          this._ClientService.createClient(object).subscribe((res) => {
            if (res) {
              this.canvas.close(this.canvasId);
              this.form.resetForm();
              this.image = '';
            }
          });
        }
      });
    }
  }
  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }
}
export let CLIENTS_MODULE_TITLE = new BehaviorSubject<string>(
  'clients.clients'
);

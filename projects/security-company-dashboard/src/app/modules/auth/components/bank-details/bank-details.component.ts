import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AcceptedFile,
  AttachmentService,
  convertDateToString,
} from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { CompanyRegisterModel } from '../../models/Company-register-model';
import { FormProvider } from '../../models/form-provider';
import { AuthService } from '../../services/auth.service';
import { CompanyRegisterForm, numberOfSteps } from '../register/form';
import { ImageService } from './../../services/image.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent implements OnInit {
  // @Output() newItemEvent = new EventEmitter<any>();
  @ViewChild('successModal') modal!: ElementRef<HTMLButtonElement>;
  step = CompanyRegisterForm.bankDetails;
  length = numberOfSteps();
  module = `/${Routing.auth.module}/${Routing.auth.children.register}`;
  bankForm!: UntypedFormGroup;
  allForm!: UntypedFormGroup;
  idProofUrl!: string | null;
  pendingLink = `/${Routing.pending}`;
  docLink!: boolean;

  get controls(): any {
    return this.bankForm.controls;
  }

  constructor(
    private formProvider: FormProvider,
    private attachment: AttachmentService,
    private router: Router,
    private auth: AuthService,
    private _ImageService: ImageService
  ) {
    this.bankForm = this.formProvider
      .getForm()
      .get(this.step.key) as UntypedFormGroup;

    this.allForm = this.formProvider.getForm();
    this.checkPrev();
  }

  ngOnInit(): void {
    this.idProofUrl = this._ImageService.idProofUrl.getValue();
  }

  checkPrev() {
    if (this.formProvider.getForm().get(this.step.prev)?.valid) {
      return;
    } else {
      let url = `${this.module}/${this.step.prev}`;
      this.router.navigate([url]);
    }
  }

  onUpload(event: any) {
    let arr = event.target.files[0].name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.controls['idProofId'] as UntypedFormControl).setErrors({
        notValid: true,
      });
      this.idProofUrl = null;
      return;
    } else {
      const files = ['pdf', 'doc', 'docx'];

      if (files.includes(extension)) {
        this.docLink = true;
      } else {
        let url = URL.createObjectURL(event.target.files[0]);
        this.idProofUrl = url;
        this._ImageService.idProofUrl.next(this.idProofUrl);
        // this.addNewUrl( this.idProofUrl)
      }

      (this.controls['idProofId'] as UntypedFormControl).setErrors({
        notValid: null,
      });

      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.controls['idProofId'].setValue(res);
        });
    }
  }

  onSubmit() {
    if (this.bankForm.invalid) return;

    if (this.step.next) {
      let url = `${this.module}/${this.step.next}`;
      this.router.navigate([url]);
    } else {
      let form: CompanyRegisterModel = this.allForm.value;
      let model = Object.assign(
        form['company-details'],
        form['bank-details'],
        form['personal-details'],
        form['other-details']
      );

      this.auth.registerCompany(model).subscribe((res) => {
        this.modal.nativeElement.click();
      });
    }
  }
  /*addNewUrl(value: any) {
    this.newItemEvent.emit(value);
  }*/
}

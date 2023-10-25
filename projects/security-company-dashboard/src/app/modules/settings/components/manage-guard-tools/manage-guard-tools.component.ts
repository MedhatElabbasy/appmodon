import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AcceptedFile,
  AttachmentService,
  CanvasService,
  LangService,
  language,
  LookupService,
  ModalService,
  OptionSetService,
} from 'projects/tools/src/public-api';

import { ManagementRoutesList } from './../../routes/settings-routes.enum';
import { OptionSet } from './../../../../../../../tools/src/lib/models/option-set';
import { AuthService } from '../../../auth/services/auth.service';
import { ManageGuardToolsService } from './../../services/manage-guard-tools.service';
import { companyEquipment } from './../../models/companyEquipment';

@Component({
  selector: 'app-manage-guard-tools',
  templateUrl: './manage-guard-tools.component.html',
  styleUrls: ['./manage-guard-tools.component.scss'],
})
export class ManageGuardToolsComponent implements OnInit {
  list = [...ManagementRoutesList];
  companyEquipment: FormGroup = this.fb.group({
    equipmentName: [null, [Validators.required, Validators.minLength(5)]],
    description: [null],
    equipmentTypeId: [null, [Validators.required]],
    equipmentPhotoId: [null, [Validators.required]],
    storeNumber: [null, [Validators.required, Validators.min(1)]],
    securityCompanyId: [null, [Validators.required]],
  });
  canvasId = 'add';
  isAr!: boolean;
  profileImage!: string | null;
  equpmint: any;
  constructor(
    public canvas: CanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private modal: ModalService,
    private lookup: LookupService,
    private _OptionSetService: OptionSetService,
    private lang: LangService,
    private auth: AuthService,
    private _ManageGuardToolsService: ManageGuardToolsService
  ) {}

  ngOnInit(): void {
    this.checkLang();
  }
  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }
  get controls(): any {
    return this.companyEquipment.controls;
  }
  add() {
    this.canvas.open(this.canvasId);
    this._OptionSetService.getOptionSetByName('Equipment').subscribe((res) => {
      this.equpmint = res.optionSetItems;
    });
  }
  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.controls['equipmentPhotoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);

      (this.controls['equipmentPhotoId'] as FormControl).setErrors({
        notValid: null,
      });
      this.profileImage = url;
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.controls['equipmentPhotoId'].setValue(res);
        });
    }
  }

  onSubmit(data: FormGroup) {
    let companyID = this.auth.snapshot.userInfo?.id;
    this.controls['securityCompanyId'].setValue(companyID);
    if (data.invalid) return;
    let send: companyEquipment = data.value;
    this._ManageGuardToolsService.AddEquipment(send).subscribe((res) => {
      if (res) {
        this.canvas.close(this.canvasId);
        location.reload();
      }
    });
  }
  reset() {
    this.profileImage = null;
    this.companyEquipment.reset();
  }
}

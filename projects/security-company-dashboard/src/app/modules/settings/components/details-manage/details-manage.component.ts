import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManageGuardToolsService } from './../../services/manage-guard-tools.service';
import { companyEquipment } from './../../models/companyEquipment';
import {
  AcceptedFile,
  CanvasService,
  LangService,
  language,
  OptionSetService,
} from 'projects/tools/src/public-api';
import { ModalService } from './../../../../../../../tools/src/lib/services/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AttachmentService } from 'projects/tools/src/lib/services/attachment.service';

@Component({
  selector: 'app-details-manage',
  templateUrl: './details-manage.component.html',
  styleUrls: ['./details-manage.component.scss'],
})
export class DetailsManageComponent implements OnInit {
  companyEquipment: FormGroup = this.fb.group({
    equipmentName: [null, [Validators.required, Validators.minLength(5)]],
    description: [null],
    equipmentTypeId: [null, [Validators.required]],
    equipmentPhotoId: [null, [Validators.required]],
    storeNumber: [null, [Validators.required, Validators.min(1)]],
    securityCompanyId: [null, [Validators.required]],
  });
  constructor(
    private _ManageGuardToolsService: ManageGuardToolsService,
    public lang: LangService,
    public modal: ModalService,
    private fb: FormBuilder,
    private _OptionSetService: OptionSetService,
    private canvas: CanvasService,
    private attachment: AttachmentService
  ) {}
  profileImage!: string | null | undefined;
  allData: companyEquipment[] = [];
  searchKey: string = '';
  modalId = 'delete';
  canvasId = 'update';
  id!: string;
  equpmint: any;
  isAr!: boolean;
  ngOnInit(): void {
    this.getAll();
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
  getAll() {
    this._ManageGuardToolsService.getAll().subscribe((res) => {
      this.allData = res;
    });
  }
  onDelete(data: companyEquipment) {
    this.modal.open(this.modalId);
    this.id = data.id;
  }
  delete() {
    this._ManageGuardToolsService.deleteEquipment(this.id).subscribe((res) => {
      if (res) {
        this.getAll();
      }
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
  update(data: companyEquipment) {
    this.id = data.id;
    this.companyEquipment.setValue({
      equipmentName: data.equipmentName,
      description: data.description,
      equipmentTypeId: data.equipmentType?.id,
      equipmentPhotoId: data.equipmentPhotoId,
      storeNumber: data.storeNumber,
      securityCompanyId: data.securityCompanyId,
    });
    this.profileImage = data.equipmentPhoto?.fullLink;
    this.canvas.open(this.canvasId);
    this._OptionSetService.getOptionSetByName('Equipment').subscribe((res) => {
      this.equpmint = res.optionSetItems;
    });
  }
  onSubmit(data: FormGroup) {
    if (data.invalid) return;
    let send: companyEquipment = data.value;
    send.id = this.id;
    this._ManageGuardToolsService.UpdateEquipment(send).subscribe((res) => {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyGuardsService } from './../../../../services/company-guards.service';
import { ActivatedRoute } from '@angular/router';
import {
  CanvasService,
  CryptoService,
  LangService,
  ModalService,
} from 'projects/tools/src/public-api';
import { ManageGuardToolsService } from './../../../../../settings/services/manage-guard-tools.service';
import { CompanySecurityGuard } from './../../../../../client/models/site-details';
import { companyEquipment } from 'projects/security-company-dashboard/src/app/modules/settings/models/companyEquipment';
import { AuthService } from 'projects/client-app/src/app/modules/auth/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-guard-equipment',
  templateUrl: './guard-equipment.component.html',
  styleUrls: ['./guard-equipment.component.scss'],
})
export class GuardEquipmentComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  guard!: CompanySecurityGuard;
  AddForm!: FormGroup;
  equipments: any[] = [];
  allEquipments: companyEquipment[] = [];
  canvasId = 'add';
  link!: string;
  message!: string;
  model = 'alert';
  flag: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private crypto: CryptoService,
    private _CompanyGuardsService: CompanyGuardsService,
    public canvas: CanvasService,
    public lang: LangService,
    private modal: ModalService,
    private fb: FormBuilder,
    private _ManageGuardToolsService: ManageGuardToolsService
  ) {
    let encryptedGuard = this.route.parent?.snapshot.params['guard'];
    this.guard = JSON.parse(this.crypto.decrypt(encryptedGuard));
    this.generateForm();
  }

  ngOnInit(): void {
    this.getEquipment();
    this.getCompanyEquipment();
  }
  generateForm() {
    this.AddForm = this.fb.group({
      companyEquipmentId: ['', [Validators.required]],
      companySecurityGuardId: ['', [Validators.required]],
    });
  }
  getEquipment() {
    this._CompanyGuardsService
      .getEquipmentsByCompanyGuardId(this.guard.id)
      .subscribe((res) => {
        this.equipments = res;
        console.log(this.equipments);
      });
  }
  getCompanyEquipment() {
    this._ManageGuardToolsService.getAll().subscribe((res) => {
      this.allEquipments = res;
    });
  }
  add() {
    this.canvas.open(this.canvasId);
  }
  onSubmit() {
    this.AddForm.controls['companySecurityGuardId'].setValue(this.guard.id);
    if (this.AddForm.invalid) return;
    this.flag = false;
    this.equipments.forEach((element) => {
      if (
        this.AddForm.controls['companyEquipmentId'].value ==
        element.companyEquipment.id
      ) {
        this.flag = true;
      }
    });
    if (this.flag) {
      this.link = 'assets/images/icons/cancel.png';
      this.message = 'aleartFail';
      this.close();
      this.modal.open(this.model);
    } else {
      this._CompanyGuardsService
        .addEquipmentToUser(this.AddForm)
        .subscribe((res) => {
          let equipment: any = res;
          if (equipment.id) {
            this.close();
            this.link = 'assets/images/icons/checked.png';
            this.message = 'aleartSuccess';
            this.modal.open(this.model);
            this.getEquipment();
          }
        });
    }
  }
  close() {
    this.canvas.close(this.canvasId);
    this.form.resetForm();
  }
}

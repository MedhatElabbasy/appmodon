import { CompanySecurityGuard } from './../../../../../../models/site-details';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AddSiteShiftModel } from 'projects/security-company-dashboard/src/app/modules/client/models/add-site-shift-model';
import { SiteSupervisorShift } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';
import { ClientSiteService } from 'projects/security-company-dashboard/src/app/modules/client/services/client-site.service';
import { Guard } from 'projects/security-company-dashboard/src/app/modules/core/models/guard';
import { ClientShift } from 'projects/security-company-dashboard/src/app/modules/schedules/models/client-shift';
import {
  CanvasService,
  LangService,
  ModalService,
} from 'projects/tools/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
})
export class ShiftsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  @Input('shifts') shifts!: SiteSupervisorShift[];
  @Input('siteId') siteId!: string;
  @Input('updatehift') updatehift: boolean = true;
  @Input('shiftList') shiftList!: ClientShift[];
  @Output('update') _update = new EventEmitter();
  canvasId = 'edit';
  canvasId2 = 'add';
  shiftForm!: FormGroup;
  editMode!: boolean;
  selectedShift!: SiteSupervisorShift | null;
  modalID = 'delete-shift-modal';
  supervisors!: string[];
  constructor(
    public lang: LangService,
    public canvas: CanvasService,
    private fb: FormBuilder,
    private clientService: ClientSiteService,
    private route: ActivatedRoute,
    private modal: ModalService
  ) {
    this.shiftForm = this.fb.group({
      clientShiftScheduleId: [null, [Validators.required]],
      companySecurityGuardId: [null, Validators.required],
      clientSiteId: [null, [Validators.required]],
      id: [null],
    });
  }

  public get controls(): any {
    return this.shiftForm.controls;
  }
  allData: string[] = [];
  ngOnInit(): void {
    /*this.supervisors.map((e: any) => {
      e.securityGuard.userName =
        e.securityGuard.firstName + ' ' + e.securityGuard.lastName;
      this.allData.push(e.securityGuard.userName);
    });
    console.log(this.allData);*/
    this.route.data.subscribe((res) => {
      this.supervisors = res['initData'].supervisors.map((e: any) => {
        e.securityGuard.userName =
          e.securityGuard.firstName + ' ' + e.securityGuard.lastName;
        return e;
      });
    });
  }

  onAdd() {
    this.editMode = false;
    this.form.resetForm();
    this.shiftForm.get('clientSiteId')?.patchValue(this.siteId);
    this.canvas.open(this.canvasId2);
  }

  onEdit(shift: SiteSupervisorShift) {
    this.editMode = true;

    this.form.resetForm();
    let _shift: AddSiteShiftModel = {
      clientShiftScheduleId: shift.clientShiftSchedule.id,
      companySecurityGuardId: shift.companySecurityGuard.id,
      clientSiteId: this.siteId,
      id: shift.id,
    };

    this.shiftForm.patchValue(_shift);
    this.canvas.open(this.canvasId);
  }

  onDelete(shift: SiteSupervisorShift) {
    this.selectedShift = shift;
    this.modal.open(this.modalID);
  }

  onSubmit() {
    if (this.shiftForm.invalid) return;
    let model = this.shiftForm.value;
    if (this.editMode) {
      this.clientService.editSiteShift(model).subscribe((res) => {
        this.update();
      });
    } else {
      delete model.id;
      this.clientService.addSiteShift(model).subscribe((res) => {
        this.update();
      });
    }
  }

  delete() {
    this.clientService
      .deleteSiteShift(this.selectedShift?.id!)
      .subscribe((res) => {
        this.modal.close(this.modalID);

        this.update();
      });
  }

  update() {
    this.canvas.close(this.canvasId);
    this._update.emit();
  }
}

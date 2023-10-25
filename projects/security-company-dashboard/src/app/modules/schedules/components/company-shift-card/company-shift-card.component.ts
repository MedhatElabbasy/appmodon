import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import {
  CanvasService,
  LangService,
  ModalService,
  OptionSet,
} from 'projects/tools/src/public-api';
import { Shift } from '../../../settings/models/shift';
import { ClientShift } from '../../models/client-shift';
import { ClientShiftModel } from '../../models/client-shift-model';
import { BreakScheduling, Schedule } from '../../models/schedule';
import { SchedulesService } from '../../services/schedules.service';

@Component({
  selector: 'app-company-shift-card',
  templateUrl: './company-shift-card.component.html',
  styleUrls: ['./company-shift-card.component.scss'],
})
export class CompanyShiftCardComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  @Input('shift') shift!: ClientShift;
  @Input('companyShifts') companyShifts!: Shift[];
  @Input('breakTypes') breakTypes!: OptionSet;
  @Output('reload') reload = new EventEmitter();
  selectedSchedule!: Schedule | null;
  readonly addCanvas!: string;
  scheduleForm!: FormGroup;
  shiftForm!: FormGroup;
  editShiftCanvas = 'edit-shift-canvas';
  isEdit!: boolean;
  modalId = 'Delete';
  week = [
    { key: 'isSaturday', name: 'Sat' },
    { key: 'isSunday', name: 'Sun' },
    { key: 'isMonday', name: 'Mon' },
    { key: 'isTuesday', name: 'Tue' },
    { key: 'isWednesday', name: 'Wed' },
    { key: 'isThursday', name: 'Thu' },
    { key: 'isFriday', name: 'Fri' },
  ];

  constructor(
    private modal: ModalService,
    public lang: LangService,
    public canvas: CanvasService,
    private fb: FormBuilder,
    private scheduleService: SchedulesService
  ) {
    this.generateForm();
    this.isPerDayExtraTimeEnabledListener();
    this.isPerWeekExtraTimeEnabledListener();
    this.addCanvas = 'addSchedule' + crypto.randomUUID();
    this.editShiftCanvas = 'edit-shift-canvas' + crypto.randomUUID();

    this.shiftForm = this.fb.group({
      companyShiftId: ['', Validators.required],
      shiftStartTime: ['', Validators.required],
      shiftEndTime: ['', Validators.required],
    });
  }

  onDeleteShift() {
    this.modal.open(this.modalId);
  }
  Delete() {
    let id = this.shift.id;
    this.scheduleService.deleteShift(id).subscribe((res) => {
      this.modal.close(this.modalId);
      this.reload.emit();
    });
  }
  deleteMode(shift: Shift) {
    let id = shift.id;
    this.scheduleService.deleteSchedule(id).subscribe((res) => {
      this.reload.emit();
    });
  }
  Cancle() {
    this.modal.close(this.modalId);
  }
  get BreakScheduling(): FormArray {
    return this.scheduleForm.get('breakScheduling') as FormArray;
  }

  public get controls(): any {
    return this.scheduleForm.controls;
  }

  public get shiftControls(): any {
    return this.shiftForm.controls;
  }

  ngOnInit(): void {}

  generateForm() {
    this.scheduleForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        nameEn: ['', [Validators.required]],
        isSaturday: [false],
        isSunday: [false],
        isMonday: [false],
        isTuesday: [false],
        isWednesday: [false],
        isThursday: [false],
        isFriday: [false],
        breakScheduling: this.fb.array([
          this.fb.group({
            restPaymentTypeId: ['', [Validators.required]],
            name: ['', [Validators.required]],
            nameEn: ['', [Validators.required]],
            breakTime: ['', [Validators.required]],
          }),
        ]),
        isPerDayExtraTimeEnabled: [false],
        perDayExtraTime: [{ value: '', disabled: true }],
        isPerWeekExtraTimeEnabled: [false],
        perWeekExtraTime: [{ value: '', disabled: true }],
        timeForRest: [false],
        extraTimeForVacations: [false],
      },
      { validators: [daysValidator, breakValidators] }
    );
  }

  // add break form group
  addBreak() {
    let breakTime = this.fb.group({
      restPaymentTypeId: [''],
      name: ['', [Validators.required]],
      nameEn: ['', [Validators.required]],
      breakTime: ['', [Validators.required]],
    });

    this.BreakScheduling.push(breakTime);
  }

  // remove break form group
  removeBreak(index: number) {
    this.BreakScheduling.removeAt(index);
  }

  // listener for check per day extra control validation
  isPerDayExtraTimeEnabledListener() {
    let control = this.controls['perDayExtraTime'] as FormControl;
    (
      this.controls['isPerDayExtraTimeEnabled'] as FormControl
    ).valueChanges.subscribe((val) => {
      if (val) {
        control.enable();
        control.addValidators(Validators.required);
        control.updateValueAndValidity();
      } else {
        control.disable();
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  // listener for check per week extra control validation
  isPerWeekExtraTimeEnabledListener() {
    let control = this.controls['perWeekExtraTime'] as FormControl;

    (
      this.controls['isPerWeekExtraTimeEnabled'] as FormControl
    ).valueChanges.subscribe((val) => {
      if (val) {
        control.enable();
        control.addValidators(Validators.required);
        control.updateValueAndValidity();
      } else {
        control.disable();
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  // schedule submit form
  onSubmit() {
    if (this.scheduleForm.invalid) return;

    this.BreakScheduling.controls.forEach((c) => {
      let control: FormControl = c.get('breakTime') as FormControl;
      let time = this.convertToHoursAndMinutes(control.value);
      control.setValue(time);
    });

    let perDay = this.scheduleForm.get('perDayExtraTime') as FormControl;
    if (perDay.enabled) {
      let time = this.convertToHoursAndMinutes(perDay.value);
      perDay.setValue(time);
    }

    let perWeek = this.scheduleForm.get('perWeekExtraTime') as FormControl;
    if (perWeek.enabled) {
      let time = this.convertToHoursAndMinutes(perWeek.value);
      perWeek.setValue(time);
    }

    if (this.isEdit) {
      this.Edit();
    } else {
      this.Add();
    }
  }

  // add schedule
  addMode() {
    this.isEdit = false;
    this.form.resetForm();
    this.canvas.open(this.addCanvas);
  }

  Add() {
    let model = this.scheduleForm.value;
    model.clientShiftScheduleId = this.shift.id;
    for (const key in model) {
      if (model[key] == null) {
        model[key] = false;
      }
    }

    this.scheduleService.addSchedule(model).subscribe(() => {
      this.update();
    });
  }

  // get selected schedule to edit and and patch value for form group
  editMode(schedule: Schedule) {
    this.isEdit = true;
    this.selectedSchedule = { ...schedule };
    this.selectedSchedule.perDayExtraTime = +this.convertToMinutes(
      this.selectedSchedule.perDayExtraTime
    );

    this.selectedSchedule.perWeekExtraTime = +this.convertToMinutes(
      this.selectedSchedule.perWeekExtraTime
    );

    this.form.resetForm();
    this.scheduleForm.patchValue(schedule);
    this.BreakScheduling.clear();

    schedule.breakScheduling.forEach((e) => {
      let breakTime = this.fb.group({
        id: e.id,
        restPaymentTypeId: [''],
        name: ['', [Validators.required]],
        nameEn: ['', [Validators.required]],
        breakTime: ['', [Validators.required]],
      });

      let data = { ...e };
      data.breakTime = this.convertToMinutes(data.breakTime);
      breakTime.patchValue(data);

      this.BreakScheduling.push(breakTime);
    });

    this.scheduleForm
      .get('perDayExtraTime')
      ?.patchValue(this.selectedSchedule.perDayExtraTime);

    this.scheduleForm
      .get('perWeekExtraTime')
      ?.patchValue(this.selectedSchedule.perWeekExtraTime);

    this.canvas.open(this.addCanvas);
  }

  // edit schedule
  Edit() {
    let model = this.scheduleForm.value;
    model.clientShiftScheduleId = this.shift.id;

    for (const key in model) {
      if (model[key] == null) {
        model[key] = false;
      }
    }

    model.id = this.selectedSchedule?.id;

    let newBreaks: BreakScheduling[] = [];
    let deletedBreaks: BreakScheduling[] = [];
    let updatedBreaks: BreakScheduling[] = [];

    newBreaks = model.breakScheduling.filter((e: any) => !e.id);
    newBreaks = newBreaks.map((e) => ({
      ...e,
      SchedulingId: this.selectedSchedule?.id,
    }));

    this.selectedSchedule?.breakScheduling.filter((e) => {
      const index = model.breakScheduling.findIndex((a: any) => a.id == e.id);
      if (index == -1) {
        deletedBreaks.push(e);
      } else {
        const { name, nameEn, breakTime, restPaymentTypeId } =
          model.breakScheduling[index];
        let obj1 = {
          name: name,
          nameEn: nameEn,
          breakTime: breakTime,
          restPaymentTypeId: restPaymentTypeId,
        };

        let obj2 = {
          name: e.name,
          nameEn: e.nameEn,
          breakTime:
            e.breakTime.split(':')[0] + ':' + e.breakTime.split(':')[1],
          restPaymentTypeId: e.restPaymentTypeId,
        };
        if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
          updatedBreaks.push({
            ...model.breakScheduling[index],
            SchedulingId: this.selectedSchedule?.id,
          });
        }
      }
    });

    model.breakScheduling = [...newBreaks];

    let mainReq = this.scheduleService.updateSchedule(model);

    let requests$: any = [mainReq];
    updatedBreaks.forEach((e) => {
      let req = this.scheduleService.updateBreak(e);
      requests$.push(req);
    });

    deletedBreaks.forEach((e) => {
      let req = this.scheduleService.deleteBreak(e.id);
      requests$.push(req);
    });

    combineLatest(requests$).subscribe((res: any) => {
      this.selectedSchedule = null;
      this.update();
    });
  }

  // prepare edit shit form
  onEditShift() {
    this.shiftForm.patchValue(this.shift);
    this.canvas.open(this.editShiftCanvas);
  }

  // send update notification to parent component
  update() {
    this.reload.emit();
  }

  // func to edit shift
  editShift() {
    if (this.shiftForm.invalid) return;

    let model: ClientShiftModel = this.shiftForm.value;
    model.id = this.shift.id;
    model.securityCompanyClientId = this.shift.securityCompanyClientId;

    this.scheduleService
      .updateShiftSchedule(model)
      .subscribe(() => this.update());
  }

  convertToHoursAndMinutes(time: number) {
    let h = Math.floor(time / 60);
    let m = time % 60;

    let res =
      h.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      m.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    return res;
  }

  convertToMinutes(time: string): string {
    let str = time.split(':');
    let h = +str[0] * 60;
    let m = +str[1];
    return (h + m).toLocaleString();
  }
}

const daysValidator: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  let isValid: boolean = false;
  week.forEach((e) => {
    if (form.get(e)?.value) {
      isValid = true;
    }
  });

  return isValid ? null : { days: true };
};

const breakValidators: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  let isValid: boolean = true;
  (form.get('breakScheduling') as FormArray).controls.forEach((e) => {
    if (e.invalid) {
      isValid = false;
    }
  });

  return isValid ? null : { days: true };
};

const week = [
  'isSaturday',
  'isSunday',
  'isMonday',
  'isTuesday',
  'isWednesday',
  'isThursday',
  'isFriday',
];

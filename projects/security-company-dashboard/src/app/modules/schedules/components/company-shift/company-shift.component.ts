import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { CanvasService, LangService, OptionSet } from 'projects/tools/src/public-api';
import { Client } from '../../../client/models/clients';
import { Shift } from '../../../settings/models/shift';
import { ClientShiftModel } from '../../models/client-shift-model';
import { SchedulesService } from '../../services/schedules.service';

@Component({
  selector: 'app-company-shift',
  templateUrl: './company-shift.component.html',
  styleUrls: ['./company-shift.component.scss'],
})
export class CompanyShiftComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  clients!: Client[];
  client!: Client;
  shifts!: any;
  securityCompanyShifts!: Shift[];
  addCanvas = 'add-canvas';
  shiftForm!: FormGroup;
  breakTypes!: OptionSet;
  searchKey = '';

  constructor(
    private route: ActivatedRoute,
    private schedules: SchedulesService,
    public canvas: CanvasService,
    public lang: LangService,
    private fb: FormBuilder
  ) {
    this.shiftForm = this.fb.group({
      companyShiftId: ['', Validators.required],
      shiftStartTime: ['', Validators.required],
      shiftEndTime: ['', Validators.required],
    });
  }

  public get controls(): any {
    return this.shiftForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    let data: Data = this.route.snapshot.data;
    this.clients = data['initData'].clients.data;
    this.securityCompanyShifts = data['initData'].shifts.data;
    this.breakTypes = data['initData'].breakTypes;
  }

  getClientShifts(_client: Client) {
    this.client = _client;
    this.schedules.getAllShifts(this.client.id).subscribe((res) => {
      this.shifts = res;
    });
  }

  addShift() {
    if (this.shiftForm.invalid) return;
    let model = this.shiftForm.value;
    model.securityCompanyClientId = this.client.id;
    this.schedules.addShiftSchedule(model).subscribe((res) => {
      this.canvas.close(this.addCanvas);
      this.form.resetForm();
      this.getClientShifts(this.client);
    });
  }
}

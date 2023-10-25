import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanvasService, Lookup, Pagination, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Shift } from '../../models/shift';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
})
export class ShiftsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  addCanvas = 'add-shift';
  shifts!: Pagination<Shift>;
  types!: Lookup[];
  shiftForm!: FormGroup;
  pageNumber = 1;
  pageSize = 10;
  sizes = [...PAGINATION_SIZES];

  constructor(
    private fb: FormBuilder,
    public canvas: CanvasService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private shiftsServices: ShiftsService
  ) {
    this.shiftForm = this.fb.group({
      shiftTypeId: [null, [Validators.required]],
      securityCompanyId: [],
    });
  }

  public get Shift(): FormControl {
    return this.shiftForm.get('shiftTypeId') as FormControl;
  }

  ngOnInit(): void {
    this.getInitData();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getShifts();
  }

  onPageNumberChange(number: any) {
    this.pageNumber = number;
    this.getShifts();
  }

  getInitData() {
    this.route.data.subscribe((res: any) => {
      this.shifts = res.initData.shifts;

      this.types = res.initData.types;
    });
  }

  addShift() {
    if (this.shiftForm.invalid) return;

    let model = this.shiftForm.value;
    model.securityCompanyId = this.auth.snapshot.userInfo?.id;
    this.shiftsServices.add(model).subscribe(() => {
      this.form.resetForm();
      this.canvas.close(this.addCanvas);
      this.getShifts();
    });
  }

  getShifts() {
    this.shiftsServices
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.shifts = res;
      });
  }
}

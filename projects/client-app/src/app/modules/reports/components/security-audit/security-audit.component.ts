import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormProvider } from '../../../auth/models/form-provider';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { convertConfigurationsToArray, securityAudit } from '../../../complete-profile/components/complete/form';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-security-audit',
  templateUrl: './security-audit.component.html',
  styleUrls: ['./security-audit.component.scss'],
  providers: [{ provide: FormProvider, useClass: SecurityAuditComponent }],
})
export class SecurityAuditComponent
 extends FormProvider
 implements OnInit, OnDestroy
 {
  securityAudit!: UntypedFormGroup;
  stepIndex: number = 1;
  constructor( private fb: UntypedFormBuilder , private _report:ReportsService) { 
    super();
  }

  getForm(): UntypedFormGroup {
    return this.securityAudit;
  }

  ngOnInit(): void {
    this._report.stepNumber.next(1);
    this.getStepNumber();
  }

  getStepNumber() {
    this._report.stepNumber.subscribe((res) => {
      this.stepIndex = res;
    });
  }

 

  ngOnDestroy(): void {
    this._report.stepNumber.next(0);
  }
}

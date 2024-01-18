import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { FormProvider } from '../../../auth/models/form-provider';
import { numberSteps, securityAudit } from '../../../complete-profile/components/complete/form';

@Component({
  selector: 'app-security-audit-form-notes',
  templateUrl: './security-audit-form-notes.component.html',
  styleUrls: ['./security-audit-form-notes.component.scss']
})
export class SecurityAuditFormNotesComponent implements OnInit {
  notesForm!:UntypedFormGroup;
  step!: any;
  length!: number;
  constructor(private _reports:ReportsService,private formProvider: FormProvider  ,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      rows: this.fb.array([])
    });

    // Add an initial row
    this.addRow();
    this.step = securityAudit.securityAuditForm;
    this.length = numberSteps();
    this.notesForm = this.formProvider
      .getForm()
      .get(this.step.title) as UntypedFormGroup;
  }

  get rowsFormArray() {
    return this.notesForm.get('rows') as FormArray;
  }

  addRow() {
    const newRow = this.fb.group({
      observation: '',
      recommendations: ''
    });

    this.rowsFormArray.push(newRow);
  }

  removeRow(i:number){
    this.rowsFormArray.removeAt(i);
  }

  submit() {
    if (this.notesForm.valid) {
      console.log(this.notesForm.value);
  
      const transformedData = this.notesForm.value.rows.reduce(
        (acc: any, curr: any) => {
          // Concatenate the observation and recommendations with "$"
          acc.observation.push(curr.observation);
          acc.recommendations.push(curr.recommendations);
          return acc;
        },
        { observation: [], recommendations: [] }
      );
  
      // Join the arrays into strings using "$" as a separator
      transformedData.observation = transformedData.observation.join('$');
      transformedData.recommendations = transformedData.recommendations.join('$');
  
      console.log(transformedData);
      this._reports.setFormData(transformedData);
      this._reports.stepNumber.next(5);
    }
  }
  

  pervious(){
    this._reports.stepNumber.next(3);
  }

}

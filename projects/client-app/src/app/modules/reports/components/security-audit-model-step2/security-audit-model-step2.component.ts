import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { CanvasJS } from 'projects/client-app/src/assets/canvasjs.angular.component';
import { numberSteps, securityAudit } from '../../../complete-profile/components/complete/form';
import { FormProvider } from '../../../auth/models/form-provider';

@Component({
  selector: 'app-security-audit-model-step2',
  templateUrl: './security-audit-model-step2.component.html',
  styleUrls: ['./security-audit-model-step2.component.scss']
})
export class SecurityAuditModelStep2Component implements OnInit {
  searchKey = '';
  colorSet: string[] = ["#008000", "#fff"];
  sold: {}[] = [];
  auditForms: any[] = [];
  myFormstep2!: UntypedFormGroup;
  securityInfo!:FormGroup;
  total:number=0
  pageTitle!:any;
  step!: any;
  length!: number;
  constructor(private _reports:ReportsService ,private formProvider: FormProvider , private fb: FormBuilder) {
    this.getAllAuditForm();
   }

  ngOnInit(): void {
    this.step = securityAudit.securityAuditModelstep2;
    this.length = numberSteps();
    this.myFormstep2 = this.formProvider
      .getForm()
      .get(this.step.title) as UntypedFormGroup;
  }
  ngAfterViewInit():void{
    this.getSoldCount(0);
  }
  search() {}

  getSoldCount(total:number) {
        total=(total/35)*100;
            var chartContainer = document.getElementById('test');
            if(total>=90){
              CanvasJS.addColorSet("greenShades",
              ["#008000", "#DDE9B7"]);
            }else if(total>=70 && total<=89){
              CanvasJS.addColorSet("greenShades",
              ["#FFBB00", "#DDE9B7"]);
            }else if(total<70){
              CanvasJS.addColorSet("greenShades",
              ["#ED212B", "#DDE9B7"]);
            }
           
            if (chartContainer) {
              if (chartContainer.children.length > 0) {
                chartContainer.removeChild(chartContainer.children[0]);
            }
            console.log(this.colorSet);
            
            var chart = new CanvasJS.Chart('test', {
              backgroundColor: "#FFFBF0",
              colorSet: "greenShades",
              animationEnabled: true,
              data: [
                {
                  showInLegend: false,
                  type: 'doughnut',
                  dataPoints:	[{ y: total, label: total+"%" },
                  { y: 100-total, label: 100-total+"%" }]
                },
              ],
            });

            chart.render();
          }

      }


 generateSecurityForm(){
  this.securityInfo = this.fb.group({
    employeeName:[null,Validators.required],
    industrialCity:[null,Validators.required],
    sector:[null,Validators.required]
  })
 }     
  
 getAllAuditForm(){
  this._reports.GetSecurityAuditForm().subscribe((res:any)=>{
    if(res){
    this.auditForms=res.securityAuditFormData;
    console.log(this.auditForms);
    this.auditForms = this.auditForms.filter((item:any) => item.section == 2)
    console.log(this.auditForms);
    this.pageTitle=this.auditForms[0].mainGroup
    this.createForm();
    this.populateForm();
  }
  })
 }

 degree(x:any){
  console.log(x);
  this.total=0;
  if (this.myFormstep2.valid) {
    console.log('Form values:', this.myFormstep2.value);
    let ddd = this.myFormstep2.get('auditControls') as FormArray;
    console.log(ddd.value);
    
    ddd.value.forEach((ele:any) => {
      const degree = parseInt(ele.degree.trim());
      if (!isNaN(degree)) {
     
        this.total=this.total+degree
      }
      console.log(this.total);
    });
    console.log(this.total);
    this.getSoldCount(this.total)
  
  } else {
    console.error('Form is invalid. Please check the fields.');
  }
    }


//  submitForm(){
//   this.total=0
//   if (this.myFormstep2.valid) {
//     console.log('Form values:', this.myFormstep2.value);
//     let ddd = this.myFormstep2.get('auditControls') as FormArray;
//     console.log(ddd.value);
    
//     ddd.value.forEach((ele:any) => {
//       const degree = parseInt(ele.degree.trim());
//       if (!isNaN(degree)) {
     
//         this.total=this.total+degree
//       }
//       console.log(this.total);
//     });
//     console.log(this.total);
//     this.getSoldCount(this.total)
  
//   } else {
//     console.error('Form is invalid. Please check the fields.');
//   }
//  }


 createForm() {
  // Create the form structure with FormControls
  this.myFormstep2 = this.fb.group({
    auditControls: this.fb.array([]),
  });
}

populateForm() {
  // Loop through your array and add FormControls to the form
  if (this.auditForms && this.auditForms.length > 0) {
  this.auditForms.forEach((form:any) => {
    const formGroup = this.fb.group({
      order: [form.order],
      key1: [form.key1],
      key2: [form.key2],
      section:[form.section],
      mainGroup:[form.mainGroup],
      category: [''], // Add category control
      degree: [''], 
      // Add other controls as needed
    });
  
    // Add the form group to the form array
    (this.myFormstep2.get('auditControls') as FormArray).push(formGroup);
  });
}
// this._reports.setFormData(this.myFormstep2.value);
console.log('Audit Forms:', this.auditForms);
}

pervious(){
  this._reports.stepNumber.next(1);
}


next(){
  console.log(this.myFormstep2.value);
  this._reports.setFormData(this.myFormstep2.value);
  this._reports.stepNumber.next(3);
}
}

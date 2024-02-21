import { Component, OnInit } from '@angular/core';
import { CanvasJS } from 'projects/client-app/src/assets/canvasjs.angular.component';
import { ReportsService } from '../../services/reports.service';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { numberSteps, securityAudit } from '../../../complete-profile/components/complete/form';
import { FormProvider } from '../../../auth/models/form-provider';
import { LangService, Roles, convertDateToString, language } from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Xtb } from '@angular/compiler';
import { arLocale, defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Loader } from 'projects/security-company-dashboard/src/app/modules/core/enums/loader.enum';

@Component({
  selector: 'app-security-audit-model',
  templateUrl: './security-audit-model.component.html',
  styleUrls: ['./security-audit-model.component.scss']
})
export class SecurityAuditModelComponent implements OnInit {
  error:boolean=false
  errorText:boolean=false
  searchKey = '';
  colorSet: string[] = ["#008000", "#fff"];
  sold: {}[] = [];
  auditForms: any[] = [];
  myForm!: UntypedFormGroup;
  securityInfo!:FormGroup;
  clientID!:any;
  total:number=0
  pageTitle!:any;
  step!: any;
  length!: number;
  minDate!: Date;
  visitDate = new FormControl(new Date());
  maxDate = new Date();
  sector=[{name:'القطاع الشرقي'}, {name:'القطاع الغربي'},{name:'القطاع الشمالى'}]
  industrialCity=[{name:'المدينة الصناعية'},{name:'المدينة'}]
  constructor(private _reports:ReportsService ,private auth: AuthService,
    private formProvider: FormProvider , private fb: FormBuilder,
    private localeService: BsLocaleService,  public lang: LangService) {
    this. getInfo();
    this.getAllAuditForm();
    this. generateSecurityForm();
    this. initDatePiker();
   }

  ngOnInit(): void {
    this.visitDate.setValue(null);
    this.step = securityAudit.securityAuditModel;
    this.length = numberSteps();
    this.myForm = this.formProvider
      .getForm()
      .get(this.step.order) as UntypedFormGroup;
  }
  ngAfterViewInit():void{
    this.getSoldCount(0);
  }
  search() {}


  initDatePiker() {
    defineLocale('ar', arLocale);
    defineLocale('en', enGbLocale);
    this.lang.language.subscribe((res) => {
      res === language.ar
        ? this.localeService.use('ar')
        : this.localeService.use('en');
    });
  }

degree(x:any){
console.log(x);
this.total=0;
if (this.myForm.valid) {
  console.log('Form values:', this.myForm.value);
  let ddd = this.myForm.get('auditControls') as FormArray;
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

  getInfo(){
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.auth.userInfo.subscribe((res)=>{
        if(res){
          console.log(res);
          
          this.clientID=res.id
        }
      })
      //this.clientID = this.auth.snapshot.userInfo?.id
      console.log(this.clientID);
      
    } else {
      console.log(this.auth.snapshot.userInfo);
      this.auth.userInfo.subscribe((res: any) => {
        if (res) {
          console.log(res);
          if (!res.clientCompanyBranch.isMainBranch) {
            this.auth.userInfo.subscribe((res)=>{
              if(res){
                this.clientID=res.clientCompanyBranch.clientCompanyId
              }
            })
            //this.clientID = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId
          }
          else if (res.clientCompanyBranch.isMainBranch) {
            this.auth.userInfo.subscribe((res)=>{
              if(res){
                this.clientID=res.clientCompanyId
              }
            })
           // this.clientID = this.auth.snapshot.userInfo?.clientCompanyId
          }
        }
      })
    }
  }

  getSoldCount(total:number) {
        total=(total/75)*100;
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

      get controls(): any {
        return this.securityInfo.controls;
      }


 generateSecurityForm(){
  this.securityInfo = this.fb.group({
    employeeName:[null,Validators.required],
    industrialCity:[null,Validators.required],
    sector:[null,Validators.required],
    clientCompanyId:[null,Validators.required],
    visitDate:[null,Validators.required]
  })
 }     
  
 getAllAuditForm(){
  this._reports.GetSecurityAuditForm().subscribe((res:any)=>{
    if(res){
    this.auditForms=res.securityAuditFormData;
    console.log(this.auditForms);
    this.auditForms = this.auditForms.filter((item:any) => item.section == 1)
    console.log(this.auditForms);
    this.pageTitle=this.auditForms[0].mainGroup
    this.createForm();
    this.populateForm();
    this.generateSecurityForm();
    this.visitDate.setValue(null);
  }
  })
 }


//  submitForm(){
//   this.total=0
//   if (this.myForm.valid) {
//     console.log('Form values:', this.myForm.value);
//     let ddd = this.myForm.get('auditControls') as FormArray;
//     console.log(ddd.value);
    
//     ddd.value.forEach((ele:any) => {
//       const degree = parseInt(ele.degree.trim());
//       if (!isNaN(degree)) {
     
//         this.total=this.total+degree
//       }
//       console.log(this.total);
//     });
//     console.log(this.total);
//     //this.getSoldCount(this.total)
  
//   } else {
//     console.error('Form is invalid. Please check the fields.');
//   }
//  }


 createForm() {
  // Create the form structure with FormControls
  this.myForm = this.fb.group({
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
    (this.myForm.get('auditControls') as FormArray).push(formGroup);
  });
}

// this._reports.setFormData(this.myForm.value);
console.log('Audit Forms:', this.auditForms);
}

next(){
  console.log(this.clientID);
  this.error=false;
  this.errorText=false
  let date = convertDateToString(this.visitDate.value);
  console.log(date);
  this.securityInfo.controls['visitDate'].setValue(date)
  this.securityInfo.controls['clientCompanyId'].setValue(this.clientID)
  console.log(this.myForm.value);
  console.log(this.securityInfo.value);
  if(this.securityInfo.invalid){
   this.errorText=true;
   console.log(this.errorText);
   
  }
  this.myForm.value.auditControls.forEach((ele:any)=>{
    if(ele.category == "" || ele.degree == ""){
    this.error=true;
    console.log(this.error);
    
    }
  })
 this.submit();
}

submit(){
  if(this.error==true || this.errorText==true){
    console.log("false");
    
  }else{
    console.log("true");
    
 this._reports.setFormData(this.myForm.value);
  // let date = convertDateToString(this.visitDate.value);
  // console.log(date);
  // this.securityInfo.controls['visitDate'].setValue(date)
  // this.securityInfo.controls['clientCompanyId'].setValue(this.clientID)
  console.log(this.securityInfo.value);
  this._reports.setFormData(this.securityInfo.value);
  this.visitDate.setValue(null);
  this._reports.stepNumber.next(2);
  }
}
  
  }

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'projects/client-app/src/environments/environment';
import { ReportsService } from '../../services/reports.service';
import { AcceptedFile, AttachmentService, ModalService } from 'projects/tools/src/public-api';
import { ImageService } from 'projects/security-company-dashboard/src/app/modules/auth/services/image.service';
import { FormProvider } from '../../../auth/models/form-provider';
import { securityAudit } from '../../../complete-profile/components/complete/form';
import { Router } from '@angular/router';
import { Routing } from '../../../core/routes/app-routes';

@Component({
  selector: 'app-security-audit-photos',
  templateUrl: './security-audit-photos.component.html',
  styleUrls: ['./security-audit-photos.component.scss']
})
export class SecurityAuditPhotosComponent {
  url: any;
  profileImage!: string | null;
  imgIsLoading: boolean = false;
  message: string = '';
  imagePath: string = '';
  photosForm!:UntypedFormGroup;
  combinedFormData: any;
  securityAuditFormData!:any;
  finish='done'
  constructor( private fb: FormBuilder,public _model:ModalService,
    private formProvider: FormProvider, private _reports:ReportsService,
    private attachment: AttachmentService,private domSanitizer: DomSanitizer,
    private _ImageService:ImageService , private _route:Router){
    this.generateForm();
  }

  generateForm() {
    this.photosForm = this.fb.group({
      attachmentId: [null, Validators.required],
    });
  }

  get photosControls(): any {
    return this.photosForm.controls;
  }


  // onImageUpload(event: any) {
  //   const files = event.addedFiles;
  //   if (files.length === 0) return;

  //   const mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = 'Only images are supported.';
  //     return;
  //   }

  //   const reader = new FileReader();
  //   this.imagePath = files;

  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.url = reader.result;
  //     console.log(this.url, files[0]);
  //     this.message = '';
  //     this.uploadFile(this.url, files[0]);
  //   };
  // }

  // uploadFile(name: string, file: File) {
  //   console.log(file);
  //   let url = `api/Attachment/uploadFormFile`;
  //   let imgSize = environment.imgSize;
  //   let fileSize = file.size;
  //   if (fileSize <= imgSize) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     console.log(formData);
  //     this.imgIsLoading = true;
  //    this.attachment.uploadFile(url, formData).subscribe((res) => {
  //       console.log(res);
  //       this.imgIsLoading = false;
  //       this.profileImage = URL.createObjectURL(file);
  //       console.log(this.profileImage);

  //       this.photosControls['attachmentId'].setValue(res);
  //    });
  //   } else {
  //     this.message = 'Max image size that you can upload it is 5 Megabyte';
  //     //this.global.addData(url, {})
  //   }
  // }

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();
    if (!AcceptedFile.includes(extension)) {
      (this.photosControls['attachmentId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);

      (this.photosControls['attachmentId'] as FormControl).setErrors({
        notValid: null,
      });

      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.profileImage = url;
          this.photosControls['attachmentId'].setValue(res);
        });
    }
  }


  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  collect(){
    if( !this.photosForm.invalid){
    this._reports.formData$.subscribe((formData) => {
      // Combine form data from all components
      this.combinedFormData = {
        ...this.combinedFormData,
        ...formData,
      };
      console.log(this.combinedFormData);
     
      const controls0 = this.combinedFormData[0].auditControls
      const controls1 = this.combinedFormData[1]
      const controls2 = this.combinedFormData[2].auditControls
      const controls3 = this.combinedFormData[3].auditControls
      this.securityAuditFormData = [...controls0, ...controls2, ...controls3];
      let model= {
        "visitDate": controls1.visitDate,
        "sector": controls1.sector,
        "employeeName": controls1.employeeName,
        "industrialCity": controls1.industrialCity,
        "observation": this.combinedFormData[4].observation,
        "recommendations": this.combinedFormData[4].recommendations,
        "clientCompanyId": controls1.clientCompanyId,
        "securityAuditFormAttachment": [
          {
            "attachmentId": this.photosControls['attachmentId'].value
          }
        ],
        "securityAuditFormData": this.securityAuditFormData
      }
      console.log(model);
      this._reports.setSecurityAuditForm(model).subscribe((res)=>{
        console.log(res);
        this._model.open(this.finish)
      })
    });
  
  }else{
    return;
  }
  }

  pervious(){
    this._reports.stepNumber.next(4);
  }

  continue(){
    this._model.close(this.finish);
    this._route.navigate([`/${Routing.reports.module}/${Routing.reports.children.securityAuditView}`])
  }
}


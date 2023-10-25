import { ClientBranchUser } from './../../../client/models/client-branch-user';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'projects/tools/src/lib/validators/custom-validators.class';
import {
  AcceptedImage,
  AttachmentService,
  CanvasService,
  ClientCompany,
  ClientOrder,
  LangService,
  language,
  PAGINATION_SIZES,
  RequestsService,
  Roles,
  mapTheme
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit {
  user!: any;
  orders!: ClientOrder[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = PAGINATION_SIZES;
  canvasID = 'client';
  canvasUserID = 'clientUser'
  profileImage!: string | null;
  pImage!:string|null;
  editClientForm!: FormGroup;
  editClientUserForm!:FormGroup
  isAr!: boolean;
  companyTypes!: any[];
  cities!: any[];
  main: boolean = true;
  mainLocation! : google.maps.LatLngLiteral;
  data: any;
  style = mapTheme;
  mapSearchTermResturant: string = '';
  lat!:any
  long!:any
  constructor(
    private auth: AuthService,
    private requestService: RequestsService,
    private canvasServices: CanvasService,
    private fb: FormBuilder,
    private lang: LangService,
    private clientServices: ClientService,
    private attachment: AttachmentService,
    private route: ActivatedRoute
  ) {
   this.generateClientForm();
   this.generateClientUserForm();
    this.checkLang();
  }

  generateClientForm(){
    this.editClientForm = this.fb.group({
      name: [null, [Validators.required]],
      companyTypeId: [null, Validators.required],
      commercialRegistrationNumber: [
        null,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      activityType: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      nationalAddress: [null, [Validators.required]],
      chargePerson: [null, [Validators.required]],
      chargePersonPhoneNumber: [null, Validators.required],
      cityId: [null, Validators.required],
      appUserId: [null, [Validators.required]],
      photoId: [null, [Validators.required]],
      id: [0],
      lat:[null],
      long:[null]
    });
  }

  generateClientUserForm(){
    this.editClientUserForm = this.fb.group({
      firstName: [null, [Validators.required]],
      phoneNumber: [null, Validators.required],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      nationalID: [null, Validators.required],
      email:  [null, [Validators.required, Validators.email]],
      isActive: [true],
      locations: [null, Validators.required],
      lat: [null],
      lng: [null],
      id: [0],
      photoId: [null, Validators.required],
      clientCompanyBranchId: [null, Validators.required],
      clientCompanyId: [null, Validators.required],
      cityId: [null, Validators.required]
    })
  }


  get clientControls(): any {
    return this.editClientForm.controls;
  }

  get clientUserControls(): any {
    return this.editClientUserForm.controls;
  }

  get MobileNumber(): any {
    return this.editClientForm.get('chargePersonPhoneNumber');
  }

  get phoneNumber(): any {
    return this.editClientUserForm.get('phoneNumber');
  }

  ngOnInit() {
    console.log("Alooooooooooooo");
    
    this.getClient();
    this.getInitData();
  }

  getClient() {
    this.auth.userInfo.subscribe((user) => {
      console.log(user);
      if (this.auth.snapshot.userIdentity?.role == Roles.ClientCompanyUser) {
        this.user = user;
        console.log(this.user);
      //  this.main = false;
       this.lat =parseFloat(this.user.lat)
      this.long =parseFloat(this.user.lng)
       this.mainLocation = {
        lat:this. lat ,
        lng: this.long
      }
      } else {
        this.user = user as ClientCompany;
        console.log(this.user);
        this.lat =parseFloat(this.user.lat)
        this.long  =parseFloat(this.user.long)
        this.mainLocation = {
          lat: this.lat ,
          lng: this.long
        }
      }
    });
  }

  getInitData() {
    this.route.data.subscribe((res: any) => {
      this.cities = [...res.lookup.city];
      this.companyTypes = [...res.lookup.companyType];
    });
  }

  getOrders(id: number) {
    this.requestService.getAllByClientCompany(id).subscribe((response) => {
      this.orders = response;
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  checkLang() {
    this.lang.language.subscribe((res) => {
      this.isAr = res === language.ar;
    });
  }

  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }

  editClient(client:any) {
    this.user = client;
    let clientID: any
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
      this.editClientForm.patchValue(this.user);
      this.mapSearchTermResturant = this.user.nationalAddress;
      this.openCanvas(this.canvasID);
    }
    else {
      console.log(this.auth.snapshot.userInfo);
      // this.auth.userInfo.subscribe((res: any) => {
      //   if (res) {
          clientID = this.auth.snapshot.userInfo?.clientCompanyBranch.clientCompanyId
         // if (!res.clientCompanyBranch.isMainBranch) {
            this.editClientUserForm.patchValue(this.user)
            this.mapSearchTermResturant = this.user.locations
            this.editClientUserForm.controls['clientCompanyId'].setValue(clientID)
            this.openCanvas(this.canvasUserID);
         // }
         // else if (res.clientCompanyBranch.isMainBranch) {}
       // }
     // })
  }
  }
 

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();
    let user = this.auth.snapshot.userIdentity;
    if (user?.roles.includes(Roles.Company)) {
    if (!AcceptedImage.includes(extension)) {
      (this.clientControls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.clientControls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          console.log(res);
          
          this.profileImage = url;
          this.clientControls['photoId'].setValue(res);
        });
    }}else{
      console.log("user photo");
      
      if (!AcceptedImage.includes(extension)) {
        (this.clientUserControls['photoId'] as FormControl).setErrors({
          notValid: true,
        });
        this.pImage = null;
        return;
      } else {
        let url = URL.createObjectURL(event.target.files[0]);
        (this.clientUserControls['photoId'] as FormControl).setErrors({
          notValid: null,
        });
        
        this.attachment
          .uploadFile(event.target.files[0].name, event.target.files[0])
          .subscribe((res) => {
            console.log(res);
            
            this.pImage = url;
            console.log(this.pImage);
            this.clientUserControls['photoId'].setValue(res);
          });
      }
    }
  }

  onSubmit() {
    if (this.editClientForm.invalid) return;
    let modal = this.editClientForm.value;
    console.log(modal);
    
    this.clientServices.update(modal).subscribe((res) => {
      this.closeCanvas(this.canvasID);
      this.getClient();
      this.auth.getClientInfo();
    });
  }

  onSubmitUser(){
   console.log(this.clientUserControls['photoId'].value);
   //this.editClientUserForm.controls['photoId'].setValue(this.clientUserControls['photoId'].value)
    console.log(this.editClientUserForm);
    if (this.editClientUserForm.invalid) return;
    let modal = this.editClientUserForm.value;
    console.log(modal);
    this.clientServices.updateUser(modal).subscribe((res)=>{
      console.log(res);
      this.auth.getClientUser(modal.id);
    })
    this.closeCanvas(this.canvasUserID);
  }
}

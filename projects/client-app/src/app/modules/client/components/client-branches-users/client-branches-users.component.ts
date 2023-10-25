import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AcceptedImage,
  CanvasService,
  CountryCode,
  LangService,
  ModalService,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { CustomValidators } from 'projects/tools/src/lib/validators/custom-validators.class';
import { ClientBranch } from '../../models/client-branch';
import { ClientBranchUser } from '../../models/client-branch-user';
import { ClientBranchUsersService } from '../../services/client-branch-users.service';
import { ClientBranchesService } from '../../services/client-branches.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-client-branches-users',
  templateUrl: './client-branches-users.component.html',
  styleUrls: ['./client-branches-users.component.scss'],
})
export class ClientBranchesUsersComponent implements OnInit {
  @ViewChild('userFormDirective') form!: FormGroupDirective;
  canvasId = 'crud-branch-users';
  userForm!: FormGroup;
  pageNumber = 1;
  fullName :any
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  code = new FormControl('', [Validators.required]);
  codes: CountryCode[] = [];
  photoLink!: string | null;
  selectedUser!: ClientBranchUser | null;
  modalId = 'delete_branch_user';
  searchKey = '';
  branch!: ClientBranch;
  users!: ClientBranchUser[];
  acceptedFiles = [...AcceptedImage];

  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    public canvas: CanvasService,
    private fb: FormBuilder,
    private branchesServices: ClientBranchesService,
    private modal: ModalService,
    private usersServices: ClientBranchUsersService,
    private router: Router,
    private auth: AuthService,
  ) {
    console.log(this.auth.snapshot.userInfo?.id!);
    
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      nationalID: [
        null,
        [Validators.required, Validators.pattern('[1-2][\\d]{9}')],
      ],
      email: ['', [Validators.required, Validators.email]],
      isActive: [false],
      locations: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lng: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      photoId: [null],
      clientCompanyId:[null]
    });

    this.getInitData();
    this.mobileValidationListener();
  }

  get controls(): any {
    return this.userForm.controls;
  }

  get MobileNumber(): FormControl | any {
    return this.userForm.controls['phoneNumber'];
  }

  ngOnInit(): void {}

  getInitData() {
    this.route.data.subscribe((res) => {
      this.codes = res['initData'].codes;
      this.branch = res['initData'].branch;
      this.users = res['initData'].users;
      this.setDefaultCode();
      this.getUsers()
    });
  }

  getUsers() {
    this.usersServices
      .getAllUsersByBranchId(this.branch.id)
      .subscribe((res) => {
        this.users = res;
        this.total = res.length;
        console.log(this.users);
        
        this.newObject()
      });
  }
  newObject(){
    this.users.forEach((user)=>{
      let value= user.firstName+" "+user.lastName
      console.log(value);
     console.log(user);
    user['fullName']=value
    console.log(user);
    })
    console.log(this.users);
    
  }
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  mobileValidationListener() {
    this.code.valueChanges.subscribe((res) => {
      let code: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == res
      )!;

      this.MobileNumber.clearValidators();
      this.MobileNumber.updateValueAndValidity();

      this.MobileNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);
      this.MobileNumber.updateValueAndValidity();
    });
  }

  setDefaultCode() {
    let defaultCountry = this.codes.find((element: CountryCode) => {
      return element.ioS2 === '+966';
    })!;
    this.code.setValue(defaultCountry.prefixCode);
  }

  onAdd() {
    this.form.resetForm();
    this.setDefaultCode();
    this.canvas.open(this.canvasId);
  }

  onEdit(_user: ClientBranchUser) {
    this.form.resetForm();
    this.selectedUser = _user;
    if (_user.photo) {
      this.photoLink = _user.photo.fullLink;
    }

    this.userForm.patchValue(this.selectedUser);
    this.canvas.open(this.canvasId);
  }

  onDelete(_user: ClientBranchUser) {
    this.selectedUser = _user;
    this.modal.open(this.modalId);
  }

  onSubmit() {
    if (this.userForm.valid) {
      let model: ClientBranchUser = this.userForm.value;
      model.clientCompanyId = this.auth.snapshot.userInfo?.id!;
      let prefixCode = this.code.value;
      let number: string = model.phoneNumber;

      let phoneCountry: CountryCode = this.codes.find(
        (e: CountryCode) => e.prefixCode == prefixCode
      )!;

      if (number.startsWith('0')) {
        number = number.substring(1);
      }

      if (!model.phoneNumber.startsWith(phoneCountry.prefixCode)) {
        model.phoneNumber = phoneCountry.prefixCode + number;
      }

      if (model.isActive == null) {
        model.isActive = false;
      }

      model.clientCompanyBranchId = this.branch.id;

      if (this.selectedUser) {
        model.id = this.selectedUser.id;
        this.edit(model);
      } else {
        this.add(model);
      }
    }
  }

  add(model: ClientBranchUser) {
    console.log(model);
    
    this.usersServices.add(model).subscribe((res) => {
      this.getUsers();
      this.resetFrom();
    });
  }

  edit(model: ClientBranchUser) {
    model.clientCompanyId = this.auth.snapshot.userInfo?.id!;
    console.log(model);
    
    this.usersServices.update(model).subscribe((res) => {
      this.getUsers();
      this.resetFrom();
    });
  }

  toggleState(user: ClientBranchUser, event: boolean) {
    this.usersServices.update(user).subscribe(() => this.getUsers());
  }

  toggleBranchState(_branch: ClientBranch) {
    this.branchesServices.updateBranch(_branch).subscribe((res) => {});
  }

  delete() {
    this.usersServices.delete(this.selectedUser?.id!).subscribe((res) => {
      this.selectedUser = null;
      this.getUsers();
      this.modal.close(this.modalId);
    });
  }

  resetFrom() {
    this.photoLink = null;
    this.selectedUser = null;
    this.canvas.close(this.canvasId);
    this.setDefaultCode();
    this.form.resetForm();
  }
}

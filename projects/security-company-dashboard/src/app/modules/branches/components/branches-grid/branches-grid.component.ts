import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AcceptedFile,
  AttachmentService,
  CanvasService,
  ModalService,
  PAGINATION_SIZES,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../auth/services/auth.service';
import { Branch } from '../../models/branch';
import { BranchesService } from '../../services/branches.service';
import { securityCompany } from './../../../agent/model/agent';

@Component({
  selector: 'app-branches-grid',
  templateUrl: './branches-grid.component.html',
  styleUrls: ['./branches-grid.component.scss'],
})
export class BranchesGridComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  branches!: Branch[];
  canvasId = 'crud-branch';
  selectedBranch!: Branch | null;
  photo!: string | null;
  branchForm!: FormGroup;
  modalId = 'delete-branch';
  deleteId!: any;
  searchKey = '';

  public get controls(): any {
    return this.branchForm.controls;
  }
  constructor(
    public canvas: CanvasService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private attachment: AttachmentService,
    private branchService: BranchesService,
    private modal: ModalService
  ) {
    this.generateBranchForm();
  }

  ngOnInit() {
    this.getInitData();
    const newArr = this.branches.map((ele: Branch) => {
      delete ele['securityCompany'];
      return ele;
    });
    this.branches = newArr;
  }

  getInitData() {
    this.route.data.subscribe((data) => {
      this.branches = data['branches'];
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onUpdate(branch: Branch) {
    this.selectedBranch = branch;

    if (branch.photo) {
      this.photo = branch.photo.fullLink;
    }

    this.branchForm.patchValue(branch);
    this.canvas.open(this.canvasId);
  }

  onAdd() {
    this.selectedBranch = null;
    this.photo = null;
    this.form.resetForm();
    this.canvas.open(this.canvasId);
  }

  onDelete(id: any) {
    this.deleteId = id;
    this.modal.open(this.modalId);
  }

  loadBranches() {
    this.canvas.close(this.canvasId);
    this.reset();
    this.branchService
      .getAllByCompanyId()
      .subscribe((response) => (this.branches = response));
  }

  generateBranchForm() {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required]],
      nameEn: ['', [Validators.required]],
      overview: ['', [Validators.required]],
      overviewEn: ['', [Validators.required]],
      address: ['', [Validators.required]],
      locationLat: ['', [Validators.required]],
      locationLng: ['', [Validators.required]],
      photoId: [null, [Validators.required]],
      stauts: [false],
      isMainBranch: [false],
    });
  }

  onImageUpload(event: any) {
    let arr = event.target.files[0].name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedFile.includes(extension)) {
      (this.controls['photoId'] as UntypedFormControl).setErrors({
        notValid: true,
      });
      this.photo = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.controls['photoId'] as UntypedFormControl).setErrors({
        notValid: null,
      });
      this.photo = url;
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.controls['photoId'].setValue(res);
        });
    }
  }

  onSubmit() {
    if (this.branchForm.invalid) return;
    let model = this.branchForm.value;
    model.securityCompanyId = this.auth.snapshot.userInfo?.id;

    if (model.isMainBranch == null) {
      model.isMainBranch = false;
    }

    if (model.stauts == null) {
      model.stauts = false;
    }

    if (this.selectedBranch) {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let model = this.branchForm.value;
    this.branchService.add(model).subscribe((res) => this.loadBranches());
  }

  edit() {
    let model = this.branchForm.value;
    model.id = this.selectedBranch?.id;

    this.branchService.edit(model).subscribe((res) => this.loadBranches());
  }

  delete() {
    this.branchService
      .delete(this.deleteId)
      .subscribe((res) => this.loadBranches());
  }

  onLocationListener(event: any) {
    if (event) {
      (this.controls['address'] as UntypedFormControl).patchValue(
        event.formatted_address
      );
      (this.controls['locationLng'] as UntypedFormControl).patchValue(
        event.latLng.lng
      );
      (this.controls['locationLat'] as UntypedFormControl).patchValue(
        event.latLng.lat
      );
    }
  }

  reset() {
    this.form.reset();
    this.photo = null;
  }
}

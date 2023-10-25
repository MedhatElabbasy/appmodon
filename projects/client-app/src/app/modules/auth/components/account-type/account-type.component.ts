import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'projects/client-app/src/environments/environment';
import { AuthTypeName } from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
})
export class AccountTypeComponent implements OnInit {
  registerType = AuthTypeName;
  accountTypeForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.accountTypeForm = this.fb.group({
      type: [null, Validators.required],
    });
  }

  public get type(): FormControl {
    return this.accountTypeForm.controls['type'] as FormControl;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.accountTypeForm.invalid) return;
    if (this.type.value != AuthTypeName.registerSecurityCompany) {
      let url = `/${Routing.auth.module}/${Routing.auth.children.registerNumber}`;
      this.router.navigate([url, this.type.value]);
    } else {
      window.location.replace(environment.registerLink);
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/security-company-dashboard/src/app/modules/auth/services/auth.service';
import {
  GuardLocation,
  GuardLocationModel,
} from 'projects/security-company-dashboard/src/app/modules/client/models/guard-location';
import { CompanySecurityGuard } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';
import { ClientSiteService } from 'projects/security-company-dashboard/src/app/modules/client/services/client-site.service';
import { GuardsService } from 'projects/security-company-dashboard/src/app/modules/core/services/guards.service';
import { combineLatest, map } from 'rxjs';
import { CanvasService, PAGINATION_SIZES, Roles } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-location-guards',
  templateUrl: './location-guards.component.html',
  styleUrls: ['./location-guards.component.scss'],
})
export class LocationGuardsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  guards!: GuardLocation[];
  noOfGuards!: number;
  addGuardCanvas = 'add-guard-canvas';
  guardForm!: FormGroup;
  locationId!: string;
  isAdmin!: boolean;
  availableGuards!: CompanySecurityGuard[];
  searchKey = '';

  constructor(
    private route: ActivatedRoute,
    public canvas: CanvasService,
    private fb: FormBuilder,
    private guardService: GuardsService,
    private auth: AuthService,
    private siteService: ClientSiteService
  ) {
    this.guardForm = this.fb.group({
      siteLocationId: [null],
      companySecurityGuardId: [null, [Validators.required]],
    });
  }

  public get CompanySecurityGuardId(): FormControl {
    return this.guardForm.get('companySecurityGuardId') as FormControl;
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.data])
      .pipe(map((res) => ({ params: res[0], data: res[1] })))
      .subscribe((res) => {
        this.guards = res.data['initData'];
        this.noOfGuards = res.params['guards'];
        this.locationId = res.params['locationId'];
      });

    this.isAdmin =
      this.auth.snapshot.userIdentity?.roles.includes(Roles.VirtualAdmin) ??
      false;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(_pageNumber: number) {
    this.pageNumber = _pageNumber;
  }

  addGuard() {
    this.loadAvailableGuards();
  }

  loadAvailableGuards() {
    let guards$;
    if (this.isAdmin) {
      guards$ = this.guardService.getAllAvailableGuardByCompany();
    } else {
      guards$ = this.guardService.getAllAvailableGuardByBranch();
    }

    guards$
      .pipe(
        map((res) => {
          return res.map((e) => {
            e.username =
              e.securityGuard.firstName + ' ' + e.securityGuard.lastName;

            return e;
          });
        })
      )
      .subscribe((res) => {
        this.availableGuards = res;
        this.canvas.open(this.addGuardCanvas);
      });
  }

  onSubmit() {
    if (this.guardForm.invalid) return;
    let model: GuardLocationModel = {
      companySecurityGuardId: this.CompanySecurityGuardId.value,
      siteLocationId: this.locationId,
    };

    this.siteService.addGuardOnLocation(model).subscribe((res) => {
      this.update();
      this.canvas.close(this.addGuardCanvas);
      this.form.resetForm();
    });
  }

  update() {
    this.siteService
      .getAllGuardsOnLocationByLocationId(this.locationId)
      .subscribe((res) => {
        this.guards = res;
        this.total = res.length;
      });
  }
}

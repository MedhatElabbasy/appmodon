import { GuardsService } from './../../../../../core/services/guards.service';
import { Roles } from './../../../../../../../../../tools/src/lib/enums/auth-types';
import { AuthService } from './../../../../../auth/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Guard } from 'projects/security-company-dashboard/src/app/modules/core/models/guard';
import { ClientShift } from 'projects/security-company-dashboard/src/app/modules/schedules/models/client-shift';
import {
  AcceptedImage,
  CanvasService,
  LangService,
  ModalService,
} from 'projects/tools/src/public-api';
import {
  CompanySecurityGuard,
  SiteDetails,
} from '../../../../models/site-details';
import { ClientSiteService } from '../../../../services/client-site.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss'],
})
export class SiteDetailsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  site!: SiteDetails;
  updatehift!: boolean;
  updateSuper!: boolean;
  images: string[] = [];
  displayCustom!: boolean;
  activeIndex: number = 0;
  canvasId = 'edit-company-shift';
  canvasId2 = 'edit-company-super';
  shifts!: ClientShift[];
  supervisors!: CompanySecurityGuard[];
  shiftSupervisors: any[] = [];
  locationForm!: FormGroup;
  acceptedExtensions = [...AcceptedImage];
  locationCanvas: string = 'location-canvas';
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  options: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: false,
    rtl: false,
    margin: 20,
    autoHeight: false,
    autoplay: true,
    nav: false,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      768: {
        items: 3,
      },
      992: {
        items: 5,
      },
      1024: {
        items: 5,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    public canvas: CanvasService,
    private siteServices: ClientSiteService,
    private fb: FormBuilder,
    private auth: AuthService,
    private guardServices: GuardsService
  ) {
    this.lang.isAr.subscribe((res) => {
      if (res) {
        this.options.rtl = true;
      } else {
        this.options.rtl = false;
      }
    });

    this.locationForm = this.fb.group({
      name: [null, [Validators.required]],
      numberOfGuards: [null, [Validators.required]],
      photoId: [null, [Validators.required]],
      statusId: [null],
      clientSiteId: [null],
      locationAddress: [null, [Validators.required]],
      locationLat: [null, [Validators.required]],
      locationLong: [null, [Validators.required]],
      locationHight: [null, [Validators.required]],
    });
  }

  public get controls(): any {
    return this.locationForm.controls;
  }

  ngOnInit(): void {
    this.site = this.route.snapshot.data['initData'].site;
    this.shifts = this.route.snapshot.data['initData'].shifts;
    this.supervisors = this.route.snapshot.data['initData'].supervisors.map(
      (e: any) => {
        e.securityGuard.userName =
          e.securityGuard.firstName + ' ' + e.securityGuard.lastName;
        return e;
      }
    );

    this.getImagesLinks();
    this.getGuards();
  }

  getImagesLinks() {
    this.images = [];
    this.images.push(this.site.sitePhoto.fullLink);
    this.site.siteLocations.forEach((e) => {
      this.images.push(e.photo.fullLink);
    });
  }

  getGuards() {
    this.shiftSupervisors = [];
    this.site.siteSupervisorShifts.forEach((e) => {
      const index = this.shiftSupervisors.findIndex(
        (a) => a.id == e.companySecurityGuard.securityGuard.id
      );
      if (index == -1) {
        this.shiftSupervisors.push(e.companySecurityGuard.securityGuard);
      }
    });
  }

  getSupervisors() {
    let isAdmin = this.auth.snapshot.userIdentity?.roles.includes(
      Roles.VirtualAdmin
    );
    let supervisors$;
    if (isAdmin) {
      supervisors$ = this.guardServices.getAllAvailableSupervisorsByCompany();
    } else {
      supervisors$ = this.guardServices.getAllAvailableSupervisorsByBranch();
    }

    supervisors$.subscribe((res) => {
      this.supervisors = res;
    });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  getSiteUpdate() {
    this.canvas.close(this.canvasId);
    this.siteServices.getSiteById(this.site.id).subscribe((res) => {
      this.site = res;
      this.getGuards();
      this.getImagesLinks();
    });
  }

  onAddLocation() {
    this.form.resetForm();
    this.canvas.open(this.locationCanvas);
  }

  addLocation() {
    if (this.locationForm.invalid) return;

    let model = this.locationForm.value;
    model.clientSiteId = this.site.id;

    this.siteServices.addSiteLocation(model).subscribe((res) => {
      this.getSiteUpdate();
      this.canvas.close(this.locationCanvas);
      this.form.resetForm();
    });
  }

  openShift() {
    this.updatehift = true;
    this.getSupervisors();
    this.canvas.open(this.canvasId);
  }
  openShift2() {
    this.updatehift = false;
    this.getSupervisors();
    this.canvas.open(this.canvasId);
  }
}

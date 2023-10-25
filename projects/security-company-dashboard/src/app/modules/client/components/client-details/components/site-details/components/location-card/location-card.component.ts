import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteLocation } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';
import { ClientSiteService } from 'projects/security-company-dashboard/src/app/modules/client/services/client-site.service';
import { AcceptedImage, CanvasService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent implements OnInit {
  @Input('location') location!: SiteLocation;
  @Input('siteId') siteId!: string;
  @Output('update') update = new EventEmitter();
  locationCanvas!: string;
  locationForm!: FormGroup;
  acceptedExtensions = [...AcceptedImage];

  constructor(
    private canvas: CanvasService,
    private fb: FormBuilder,
    private siteService: ClientSiteService
  ) {
    this.locationCanvas = 'location-canvas' + '-' + crypto.randomUUID();
    this.locationForm = this.fb.group({
      name: [null, [Validators.required]],
      numberOfGuards: [null, [Validators.required]],
      photoId: [null, [Validators.required]],
      locationAddress: [null, [Validators.required]],
      locationLat: [null, [Validators.required]],
      locationLong: [null, [Validators.required]],
      locationHight: [null, [Validators.required]],
    });
  }

  public get controls(): any {
    return this.locationForm.controls;
  }

  ngOnInit(): void {}

  onEdit() {
    this.locationForm.patchValue(this.location);
    this.canvas.open(this.locationCanvas);
  }

  edit() {
    if (this.locationForm.invalid) return;
    let model = this.locationForm.value;
    model.clientSiteId = this.siteId;
    model.id = this.location.id;

    this.siteService.updateSiteLocation(model).subscribe((res) => {
      this.update.emit();
    });
  }
}

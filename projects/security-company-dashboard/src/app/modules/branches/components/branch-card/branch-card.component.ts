import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LangService, mapTheme } from 'projects/tools/src/public-api';
import { Routing } from '../../../core/routes/app-routes';
import { Branch } from '../../models/branch';

@Component({
  selector: 'app-branch-card',
  templateUrl: './branch-card.component.html',
  styleUrls: ['./branch-card.component.scss'],
})
export class BranchCardComponent implements OnInit {
  @Input('branch') branch!: Branch;
  @Output('update') update = new EventEmitter<Branch>();
  @Output('delete') delete = new EventEmitter();
  manageLink!: string;
  coords!: any;
  mapOptions!: google.maps.MapOptions;
  isAr!: Observable<boolean>;
  constructor(public lang: LangService) {
    this.isAr = this.lang.isAr;
    this.mapOptions = {
      styles: mapTheme,
      fullscreenControl: false,
      rotateControl: false,
      zoomControl: false,
      scrollwheel: false,
      disableDefaultUI: true,
      draggable: false,
      panControl: false,
      zoom: 10,
    };
  }

  ngOnInit(): void {
    this.manageLink = `/${Routing.dashboard}/${Routing.branches.module}/${Routing.branches.children.branchUsers}/${this.branch.id}`;
    this.coords = {
      lat: +this.branch.locationLat!,
      lng: +this.branch.locationLng!,
    };

  }

  updateListener() {
    this.update.emit(this.branch);
  }

  deleteListener() {
    this.delete.emit(this.branch.id);
  }
}

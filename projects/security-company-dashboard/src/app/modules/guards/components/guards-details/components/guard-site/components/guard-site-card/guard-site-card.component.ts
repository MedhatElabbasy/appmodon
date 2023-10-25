import { Component, Input, OnInit } from '@angular/core';
import { SiteLocation } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';

@Component({
  selector: 'app-guard-site-card',
  templateUrl: './guard-site-card.component.html',
  styleUrls: ['./guard-site-card.component.scss'],
})
export class GuardSiteCardComponent implements OnInit {
  @Input('site') site!: SiteLocation;
  constructor() {}

  ngOnInit(): void {

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientSite } from 'projects/security-company-dashboard/src/app/modules/client/models/client-site';
import { SiteLocation } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';

@Component({
  selector: 'app-guard-site',
  templateUrl: './guard-site.component.html',
  styleUrls: ['./guard-site.component.scss'],
})
export class GuardSiteComponent implements OnInit {
  sites!: SiteLocation[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.sites = res['sites'];
    });
  }
}

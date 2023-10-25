import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'projects/client-app/src/app/modules/core/routes/app-routes';
import { SecurityCompany } from 'projects/tools/src/lib/models/security-company';
import { CryptoService, LangService, language } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
})
export class FeatureCardComponent implements OnInit {
  @Input('data') data!: SecurityCompany;
  isArabic!: boolean;

  constructor(
    private lang: LangService,
    private router: Router,
    private crypto: CryptoService
  ) {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar ? true : false;
    });
  }

  ngOnInit() {}

  companyProfile() {
    this.router.navigate([
      `/${Routing.profile.module}/${Routing.profile.children.securityCompany}`,
      this.crypto.encrypt(JSON.stringify(this.data)),
    ]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanySecurityGuard } from 'projects/security-company-dashboard/src/app/modules/client/models/site-details';
import { GuardsService } from 'projects/security-company-dashboard/src/app/modules/core/services/guards.service';
import { CryptoService, LangService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-guard-general-details',
  templateUrl: './guard-general-details.component.html',
  styleUrls: ['./guard-general-details.component.scss'],
})
export class GuardGeneralDetailsComponent implements OnInit {
  guard!: any;
  constructor(
    private route: ActivatedRoute,
    private crypto: CryptoService,
    public lang: LangService,
    public _GuardsService: GuardsService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      let encryptedGuard = params['guard'];
      let data = JSON.parse(this.crypto.decrypt(encryptedGuard));
      let id = data.securityGuard.appUserId;

      this._GuardsService.getById(id).subscribe((res) => {
        this.guard = res;
      });
    });
  }
}

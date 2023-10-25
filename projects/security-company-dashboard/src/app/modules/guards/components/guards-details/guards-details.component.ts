import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'projects/tools/src/public-api';
import { CompanySecurityGuard } from '../../../client/models/site-details';
import { Routing } from '../../../core/routes/app-routes';
import { GuardDetailsRoutesList } from '../../routes/guards-routes.enum';

@Component({
  selector: 'app-guards-details',
  templateUrl: './guards-details.component.html',
  styleUrls: ['./guards-details.component.scss'],
})
export class GuardsDetailsComponent implements OnInit {
  guard!: CompanySecurityGuard;
  links = [...GuardDetailsRoutesList];
  backLink = `/${Routing.dashboard}/${Routing.guards.module}`;
  constructor(private route: ActivatedRoute, private crypto: CryptoService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let encryptedGuard = params['guard'];
      this.guard = JSON.parse(this.crypto.decrypt(encryptedGuard));
    });
  }
}

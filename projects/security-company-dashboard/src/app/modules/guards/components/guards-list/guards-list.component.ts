import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentService, CanvasService, CryptoService, LangService, ModalService, PAGINATION_SIZES } from 'projects/tools/src/public-api';
import { CompanySecurityGuard } from '../../../client/models/site-details';
import { Routing } from '../../../core/routes/app-routes';

@Component({
  selector: 'app-guards-list',
  templateUrl: './guards-list.component.html',
  styleUrls: ['./guards-list.component.scss'],
})
export class GuardsListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [...PAGINATION_SIZES];
  guards: CompanySecurityGuard[] = [];
  searchKey = '';





  constructor(
    public lang: LangService,
    private route: ActivatedRoute,
    private crypto: CryptoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
   this.getData()
  }
  getData(){
    this.guards = this.route.snapshot.data['guards'];
  }
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }

  goToDetails(guard: CompanySecurityGuard) {
    const link = `/${Routing.dashboard}/${Routing.guards.module}/${Routing.guards.children.userDetails}`;
    const encodedGuard = this.crypto.encrypt(JSON.stringify(guard));
    this.router.navigate([link, encodedGuard]);
  }



}

import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import {
  CanvasService,
  CryptoService,
  LangService,
  Lookup,
  OptionSetItem,
  SecurityCompany,
} from 'projects/tools/src/public-api';

@Component({
  selector: 'app-security-company',
  templateUrl: './security-company.component.html',
  styleUrls: ['./security-company.component.scss'],
})
export class SecurityCompanyComponent implements OnInit {
  canvasId = 'create-request-quote';
  company!: SecurityCompany;
  initData!: { contractTypes: OptionSetItem[]; shifts: Lookup[] };
  isAr!: BehaviorSubject<boolean>;

  screenWidth: any;
  hide!: boolean;

  constructor(
    public canvas: CanvasService,
    private route: ActivatedRoute,
    private crypto: CryptoService,
    private lang: LangService
  ) {
    this.isAr = this.lang.isAr;
  }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    combineLatest([this.route.params, this.route.data])
      .pipe(map((res) => ({ params: res[0], data: res[1] })))
      .subscribe((res) => {
        this.initData = res.data['init'];

        this.company = JSON.parse(
          this.crypto.decrypt(res.params['id'])
        ) as SecurityCompany;
      });
      console.log(this.company)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.hide = this.screenWidth <= 991;
  }
}

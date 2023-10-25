import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SecurityCompany } from 'projects/tools/src/lib/models/security-company';
//import { LangService, language, Pagination } from 'projects/tools/src/public-api';
import { LangService } from 'projects/tools/src/public-api';
import { language } from 'projects/tools/src/public-api';
import { Pagination } from 'projects/tools/src/public-api';
import { Routing } from '../../modules/core/routes/app-routes';

import { articles, articlesAr } from './data/articles';
import { Clients, ClientsAR } from './data/clients';

import { Needs, NeedsAr } from './data/needs';
import { Reads, ReadsAr } from './data/reads';
import { StatisticsNumber, StatisticsNumberAr } from './data/statistics';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  links = {
    companies: `/${Routing.companies}`,
  };
  featuresCompanies!: Pagination<SecurityCompany>;
  statistics!: any[];
  needs!: any[];
  articles!: any[];
  clients!: any[];
  reads = [...Reads];
  started: boolean = false;
  searchKey = ''

  articlesOwl: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: false,
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
        items: 4,
      },
      1024: {
        items: 4,
      },
    },
  };

  clientsOWl: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    dots: true,
    autoHeight: false,
    autoplay: true,
    nav: false,
    lazyLoad: true,
    dotsData: true,
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
    },
  };

  constructor(private lang: LangService, private activeRoute: ActivatedRoute, private auth: AuthService, private router: Router) {
    this.auth.userInfo.subscribe((user) => {
      console.log(user);
      if (user) {
        router.navigate(['/dashboard']);
      }
    })
  }

  ngOnInit() {
    this.changeConfigOnLang();
    this.getInitData();
  }

  getInitData() {
    this.activeRoute.data.subscribe((res: any) => {
      res.companies.data = res.companies.data.splice(0, 5);
      this.featuresCompanies = res.companies;
    });
  }

  changeConfigOnLang() {
    this.lang.getCurrentLanguage().subscribe((lang) => {
      if (lang === language.ar) {
        this.clientsOWl.rtl = true;
        this.articlesOwl.rtl = true;
        this.statistics = [...StatisticsNumberAr];
        this.needs = [...NeedsAr];
        this.articles = [...articlesAr];
        this.clients = [...ClientsAR];
        this.reads = [...ReadsAr];
      } else {
        this.clientsOWl.rtl = false;
        this.articlesOwl.rtl = false;
        this.statistics = [...StatisticsNumber];
        this.needs = [...Needs];
        this.articles = [...articles];
        this.clients = [...Clients];
        this.reads = [...Reads];
      }
    });
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll() {
  //   let nums = document.querySelectorAll('.nums');
  //   let section = document.getElementById('info')!;
  //   if (window.scrollY > section.offsetTop) {
  //     this.started = true;

  //     if (!this.started) {
  //       nums.forEach((el) => {
  //         this.startCounters(el);
  //       });
  //     }
  //   }
  // }

  // startCounters(el: any) {
  //   let goal = el.dataset.goal;
  //   let count = setInterval(() => {
  //     if (el.textContent < goal) {
  //       el.textContent = Number(el.textContent) + 1;
  //     } else {
  //       clearInterval(count);
  //     }
  //   }, 2000 / goal);
  // }
}

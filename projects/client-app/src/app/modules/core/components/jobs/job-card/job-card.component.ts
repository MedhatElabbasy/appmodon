import { Component, Input, OnInit } from '@angular/core';
import {
  LangService,
  language,
  ModalService,
} from 'projects/tools/src/public-api';
import { AuthService } from '../../../../auth/services/auth.service';
import { JobsService } from '../../../services/jobs.service';
import { job } from './../../../models/job';
import { Router } from '@angular/router';
import { Routing } from '../../../routes/app-routes';
declare var $: any;
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit {
  @Input('data') data!: job;
  @Input() isLogin: boolean = false;
  @Input() details: boolean = false;
  isArabic!: boolean;
  successAlert = 'done';
  message!: string;
  constructor(
    private lang: LangService,
    private auth: AuthService,
    private _JobsService: JobsService,
    private router: Router,
    private modal: ModalService
  ) {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar ? true : false;
    });
  }

  ngOnInit(): void {}
  getID(myData: any,event:any) {
    event.stopImmediatePropagation();
    this.auth.userInfo.subscribe((res) => {
      if (res) {
        let securityGuardId = res.id;
        let securityCompanyId = myData.id;
        let obj = {
          securityGuardId: securityGuardId,
          companyJobId: securityCompanyId,
        };

        this._JobsService.saveJob(obj).subscribe((res) => {
          this.message='savedJob'
          this.modal.open(this.successAlert);
        });
      }
    });
  }
  getCard(id: number,event:any) {
    event.stopImmediatePropagation();
    this.router.navigate([`${Routing.jobDetails}/${id}`]);
  }
}

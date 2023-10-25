import { Component, Input, OnInit } from '@angular/core';
import { LangService, language } from 'projects/tools/src/public-api';
import { job } from '../../../models/job';

@Component({
  selector: 'app-about-job',
  templateUrl: './about-job.component.html',
  styleUrls: ['./about-job.component.scss'],
})
export class AboutJobComponent implements OnInit {
  @Input('data') data!: job;
  isArabic!: boolean;
  constructor(private lang: LangService) {}

  ngOnInit(): void {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar ? true : false;
    });
  }
}

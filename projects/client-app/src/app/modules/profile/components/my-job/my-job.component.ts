import { Component, Input, OnInit } from '@angular/core';
import { JobsService } from '../../../core/services/jobs.service';

import { LangService, language, mapTheme } from 'projects/tools/src/public-api';
@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss'],
})
export class MyJobComponent implements OnInit {
  @Input() id: number = 0;
  data: any;
  mainLocation = new google.maps.LatLng({
    lat: 23.8859,
    lng: 45.0792,
  });
  style = mapTheme;

  isArabic!: boolean;
  constructor(private _JobsService: JobsService, private lang: LangService) {}

  ngOnInit(): void {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar ? true : false;
    });
    this.getData(this.id);
  }
  getData(id: number) {
    this._JobsService.getCurrentJob(id).subscribe((res) => {
      this.data = res;
      this.data = this.data[0];
    });
  }
}

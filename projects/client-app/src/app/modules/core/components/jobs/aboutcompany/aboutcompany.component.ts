import { Component, Input, OnInit } from '@angular/core';
import { LangService, language, mapTheme } from 'projects/tools/src/public-api';
import { job } from '../../../models/job';

@Component({
  selector: 'app-aboutcompany',
  templateUrl: './aboutcompany.component.html',
  styleUrls: ['./aboutcompany.component.scss'],
})
export class AboutcompanyComponent implements OnInit {

  @Input('data') data!: job;
  mainLocation = new google.maps.LatLng({
    lat: 23.8859,
    lng: 45.0792,
  });
  style = mapTheme;

  isArabic!: boolean;
  constructor(private lang: LangService) {}
  ngOnInit(): void {
    this.lang.language.subscribe((res) => {
      this.isArabic = res == language.ar ? true : false;
    });
  }
}

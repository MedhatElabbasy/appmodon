import { Component, OnInit } from '@angular/core';
import { LangService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  constructor(public lang: LangService) { }

  ngOnInit(): void {
  }

}

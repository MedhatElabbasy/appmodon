import { Component, OnInit } from '@angular/core';
import { LangService } from 'projects/tools/src/public-api';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor(public lang: LangService) { }

  ngOnInit(): void {
  }

}

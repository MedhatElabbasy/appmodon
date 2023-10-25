import { Component, OnInit } from '@angular/core';
import { LangService } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  isAr!: boolean;
  constructor(public lang: LangService) { }

  ngOnInit(): void {

  }

}

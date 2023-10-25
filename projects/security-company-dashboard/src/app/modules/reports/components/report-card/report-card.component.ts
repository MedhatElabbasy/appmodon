import { Component, Input, OnInit } from '@angular/core';
import { Routing } from '../../../core/routes/app-routes';
import { ReportListItem } from '../../routes/reports-routes.enum';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
  @Input('data') data!: ReportListItem;
  routing = Routing;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { AttendanceReport } from 'projects/security-company-dashboard/src/app/modules/reports/models/attendance-report';

@Component({
  selector: 'app-dash-guard-card',
  templateUrl: './dash-guard-card.component.html',
  styleUrls: ['./dash-guard-card.component.scss'],
})
export class DashGuardCardComponent implements OnInit {
  @Input('data') data!: AttendanceReport;
  @Input('time') time!: string;
  constructor() {}

  ngOnInit(): void {}
}

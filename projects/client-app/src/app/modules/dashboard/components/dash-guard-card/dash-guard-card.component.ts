import { Component, Input, OnInit } from '@angular/core';
import { AttendanceReport } from '../../models/attencereport';

@Component({
  selector: 'app-dash-guard-card',
  templateUrl: './dash-guard-card.component.html',
  styleUrls: ['./dash-guard-card.component.scss']
})
export class DashGuardCardComponent implements OnInit {
  @Input('data') data!: AttendanceReport;
  @Input('time') time!: string;
  constructor() { }

  ngOnInit(): void {
  }

}

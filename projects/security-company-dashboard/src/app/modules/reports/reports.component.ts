import { Component, OnInit } from '@angular/core';
import { Roles } from 'projects/tools/src/public-api';
import { Routing } from '../core/routes/app-routes';
import { ReportListItem } from './routes/reports-routes.enum';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  ReportsList: ReportListItem[] = [
    {
      name: 'reports.attendance',
      link: `/${Routing.dashboard}/${Routing.reports.module}/${Routing.reports.children.attendance}`,
      description: 'reports.attendance_report_description',
      image: 'assets/images/svg/attendance.svg',
      roles: [Roles.VirtualAdmin],
    },
    {
      name: 'reports.accident',
      link: `/${Routing.dashboard}/${Routing.reports.module}/${Routing.reports.children.accidents}`,
      description: 'reports.accident_report_description',
      image: 'assets/images/svg/Incident.svg',
      roles: [Roles.VirtualAdmin],
    },
    {
      name: 'reports.visitors',
      link: `/${Routing.dashboard}/${Routing.reports.module}/${Routing.reports.children.visitors}`,
      description: 'reports.visitors_report_description',
      image: 'assets/images/svg/visitors.svg',
      roles: [Roles.SecurityCompanyUser, Roles.SecuritCompany],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

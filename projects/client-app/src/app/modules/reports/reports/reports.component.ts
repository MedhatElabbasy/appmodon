import { Component, OnInit } from '@angular/core';
import { ReportListItem } from '../routes/reports-routes.enum';
import { Routing } from '../../core/routes/app-routes';
import { Roles } from 'projects/tools/src/public-api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  ReportsList: ReportListItem[] = [];
  constructor() {

          this.ReportsList.push(
            {
              name: 'reports.attendance',
              link: `/${Routing.reports.module}/${Routing.reports.children.attendance}`,
              description: 'reports.attendance_report_description',
              image: 'assets/images/svg/attendance.svg',
              roles: [Roles.VirtualClientAdmin],
            },
            {
              name: 'reports.accident',
              link: `/${Routing.reports.module}/${Routing.reports.children.accidents}`,
              description: 'reports.accident_report_description',
              image: 'assets/images/svg/Incident.svg',
              roles: [Roles.VirtualClientAdmin],
            },
            {
              name: 'reports.visitors',
              link: `/${Routing.reports.module}/${Routing.reports.children.visitors}`,
              description: 'reports.visitors_report_description',
              image: 'assets/images/svg/visitors.svg',
              roles: [Roles.VirtualClientAdmin],
            },
            {
                name: 'reports.Security_audit_model',
                link: `/${Routing.reports.module}/${Routing.reports.children.securityAuditView}`,
                description: 'reports.Security_audit_model_description',
                image: 'assets/images/svgs/guard.svg',
                roles: [Roles.VirtualClientAdmin],
            },
           {
            name: 'reports.missions',
            link: `/${Routing.reports.module}/${Routing.reports.children.missions}`,
            description: 'reports.missions_report_description',
            image: 'assets/images/svg/visitors.svg',
            roles: [Roles.SecurityCompanyUser, Roles.SecuritCompany],
          },
          {
            name: 'reports.tours',
            link: `/${Routing.reports.module}/${Routing.reports.children.tours}`,
            description: 'reports.tours_report_description',
            image: 'assets/images/svg/visitors.svg',
            roles: [Roles.SecurityCompanyUser, Roles.SecuritCompany],
          }
          );
        
 

  }

  ngOnInit(): void {
    console.log(this.ReportsList);
  }

}

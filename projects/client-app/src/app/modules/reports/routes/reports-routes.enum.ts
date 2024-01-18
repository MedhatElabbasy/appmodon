

export enum ReportsRoutes {
  allReports = 'all-reports',
  accidents = 'accidents',
  visitors = 'visitors',
  attendance = 'attendance',
  guardAttendance = 'guard-attendance',
  superVisorAttendance = 'superVisor-attendance',
  securityAuditModel='security-audit-model',
  securityAuditModelStep2='security-audit-model-step2',
  securityAuditModelStep3='security-audit-model-step3',
  securityAuditFormNotes='security-audit-form-notes',
  securityAuditPhotos='security-audit-photos',
  securityAudit='security-audit',
  securityAuditView='security-audit-view',
  missions='missions',
  tours='tours'
}

export interface ReportListItem {
  name: string;
  description: string;
  link: string;
  image: string;
  roles?: string[];
}


export const TypesList: {
  name: string;
  link: string;
}[] = [
  {
    name: 'guard',
    link: ReportsRoutes.guardAttendance,
  },
  {
    name: 'supervisors',
    link: ReportsRoutes.superVisorAttendance,
  },
];
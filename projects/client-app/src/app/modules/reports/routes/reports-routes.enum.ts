

export enum ReportsRoutes {
  allReports = 'all-reports',
  accidents = 'accidents',
  visitors = 'visitors',
  attendance = 'attendance',
  guardAttendance = 'guard-attendance',
  superVisorAttendance = 'superVisor-attendance',
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
import { Routing } from '../../core/routes/app-routes';

export enum ReportsRoutes {
  allReports = 'all-reports',
  accidents = 'accidents',
  visitors = 'visitors',
  attendance = 'attendance',
}

export interface ReportListItem {
  name: string;
  description: string;
  link: string;
  image: string;
  roles?: string[];
}

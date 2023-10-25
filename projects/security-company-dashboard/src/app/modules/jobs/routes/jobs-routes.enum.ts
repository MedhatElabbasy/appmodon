import { Roles } from 'projects/tools/src/public-api';

export enum JobsRoutes {
  jobsGrid = 'jobs-grid',
  jobDetails = 'job-details',
  waitingApprove = 'waiting-approve',
}

export const JobRoutesList: {
  name: string;
  link: string;
  roles: string[];
}[] = [
  {
    name: 'jobs',
    link: JobsRoutes.jobsGrid,
    roles: [Roles.VirtualAdmin, Roles.SecurityCompanyUser],
  },
  {
    name: 'waiting_approve',
    link: JobsRoutes.waitingApprove,
    roles: [Roles.VirtualAdmin, Roles.SecurityCompanyUser],
  },
];

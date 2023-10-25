import { LookupsRoutes } from 'projects/security-company-dashboard/src/app/modules/lookups/routes/lookup-routes';
import { AuthRoutes } from '../../auth/routes/auth-routes.enum';
import { ClientRoutes } from '../../client/routes/client-routes.enum';
import { completeProfileRoutes } from '../../complete-profile/routes/completeProfile';
import { dashboardRoutes } from '../../dashboard/routes/dashboard-routes.enum';
import { ProfileRoutes } from '../../profile/routes/profile-routes.enum';
import { ReportsRoutes } from '../../reports/routes/reports-routes.enum';
import { LocationRoutes } from '../../locations/routes/location-routes';
import { clientGuardRoutes } from '../../client-guard/routes/client-gurad';

export const Routing = {
  auth: {
    module: 'auth',
    children: AuthRoutes,
  },
  dashboad:{
        module:'dashboard',
        children: dashboardRoutes,
  },
  profile: {
    module: 'profile',
    children: ProfileRoutes,
  },
  client: {
    module: 'client-control',
    children: ClientRoutes,
  },
  completeProfile:{
       module:'complete-profile',
       children:completeProfileRoutes
  },
  reports:{
    module:'reports',
    children:ReportsRoutes
  },
  location:{
    module:'locations',
    children:LocationRoutes
  },
  clientGuard:{
    module:'client-guard',
    children:clientGuardRoutes
  },

  settings: 'settings',
  home: 'home',
  privacyPolicy: 'privacyPolicy',
  jobs: 'jobs',
  jobDetails: 'jobDetails',
  termsConditions: 'termsConditions',
  faqs: 'faqs',
  postProposal: 'postProposal',
  unauthorized: '401',
  notFound: '404',
  forbidden: '403',
  underConstruction: 'under-construction',
  companies: 'companies',
  clientCompanies: 'clientCompanies',
  MonitoringComplaints: 'lookups/monitoring-complaints',
  infractionDetails: 'infraction-Details',
};

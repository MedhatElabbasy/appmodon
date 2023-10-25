import { AccountRoutes } from '../../account-management/routes/account-routes.enum';
import { agentRoutes } from '../../agent/routes/agent-routes';
//import { agentRoutes } from '../../agent/routes/agent-routes';
import { AuthRoutes } from '../../auth/routes/auth-routes.enum';
import { BranchesRoutes } from '../../branches/routes/branches-routes.enum';
import { ClientsRoutes } from '../../client/routes/clients-routes.enum';
import { ContractsRoutes } from '../../contracts/routes/contracts-routes';
import { GuardsRoutes } from '../../guards/routes/guards-routes.enum';
import { JobsRoutes } from '../../jobs/routes/jobs-routes.enum';
import { LookupsRoutes } from '../../lookups/routes/lookup-routes';
import { ReportsRoutes } from '../../reports/routes/reports-routes.enum';
import { SchedulesRoutes } from '../../schedules/routes/schedules-routes.enum';
import { SettingsRoutes } from '../../settings/routes/settings-routes.enum';
export const Routing = {
  auth: {
    module: 'auth',
    children: AuthRoutes,
  },
  jobs: {
    module: 'jobs',
    children: JobsRoutes,
  },
  clients: {
    module: 'clients',
    children: ClientsRoutes,
  },
  agents: {
    module: 'agents',
    children: agentRoutes,
  },
  account: {
    module: 'account',
    children: AccountRoutes,
  },
  branches: {
    module: 'branches',
    children: BranchesRoutes,
  },
  lookups: {
    module: 'lookups',
    children: LookupsRoutes,
  },
  contracts: {
    module: 'contracts',
    children: ContractsRoutes,
  },
  schedules: {
    module: 'schedules',
    children: SchedulesRoutes,
  },
  settings: {
    module: 'settings',
    children: SettingsRoutes,
  },
  reports: {
    module: 'reports',
    children: ReportsRoutes,
  },
  guards: {
    module: 'guards',
    children: GuardsRoutes,
  },

  dashboard: 'dashboard',
  statics: 'statics',
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  unauthorized: '401',
  notFound: '404',
  forbidden: '403',
  notActive: 'not-active',
  underConstruction: 'under-construction',
};

import { Roles } from 'projects/tools/src/public-api';
import { MenuItem } from '../../core/models/menu-item';
export enum agentRoutes {
  agentGrid = 'Agent-grid',
  //rejectedAgents = 'rejected-agents',
  acceptedAgents = 'accepted-agents',
  waitingApproveAgents = 'waiting-approve-agents',
}

export const agentRoutesList: {
  name: string;
  link: string;
  roles: string[];
}[] = [
  {
    name: 'agent',
    link: agentRoutes.agentGrid,
    roles: [Roles.VirtualAdmin, Roles.SecurityCompanyUser],
  },
 /* {
    name: 'rejected-agents',
    link: agentRoutes.rejectedAgents,
    roles: [Roles.VirtualAdmin, Roles.SecurityCompanyUser],
  },*/
  {
    name: 'accepted-agents',
    link: agentRoutes.acceptedAgents,
    roles: [Roles.VirtualAdmin, Roles.SecurityCompanyUser],
  },
  {
    name: 'waiting-approve-agents',
    link: agentRoutes.waitingApproveAgents,
    roles: [Roles.VirtualAdmin, Roles.SecurityCompanyUser],
  },
];

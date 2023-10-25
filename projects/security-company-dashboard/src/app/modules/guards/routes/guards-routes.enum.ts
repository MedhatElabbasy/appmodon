import { Roles } from 'projects/tools/src/public-api';
import { MenuItem } from '../../core/models/menu-item';

export enum GuardsRoutes {
  guardsList = 'guards-list',
  supervisorsList = 'supervisors-list',
  userDetails = 'user-details',
  generalDetails = 'general-details',
  sites = 'sites',
  userLeaves = 'user-leaves',
  equipment = 'user-Equipment',
}

export const GuardsRoutesList: MenuItem[] = [
  {
    name: 'clients.guards',
    link: GuardsRoutes.guardsList,
    icon: null,
    image: null,
    children: null,
  },
  {
    name: 'supervisor',
    link: GuardsRoutes.supervisorsList,
    icon: null,
    image: null,
    children: null,
  },
];

export const GuardDetailsRoutesList: {
  name: string;
  link: string;
  roles: string[];
}[] = [
  {
    name: 'clients.general_details',
    link: GuardsRoutes.generalDetails,
    roles: [
      Roles.SecuritCompany,
      Roles.VirtualAdmin,
      Roles.SecurityCompanyUser,
    ],
  },
  {
    name: 'clients.sites',
    link: GuardsRoutes.sites,
    roles: [
      Roles.SecuritCompany,
      Roles.VirtualAdmin,
      Roles.SecurityCompanyUser,
    ],
  },
  {
    name: 'security_dashboard.users_leaves',
    link: GuardsRoutes.userLeaves,
    roles: [
      Roles.SecuritCompany,
      Roles.VirtualAdmin,
      Roles.SecurityCompanyUser,
    ],
  },
  {
    name: 'managmentTools.tools',
    link: GuardsRoutes.equipment,
    roles: [
      Roles.SecuritCompany,
      Roles.VirtualAdmin,
      Roles.SecurityCompanyUser,
    ],
  },
];

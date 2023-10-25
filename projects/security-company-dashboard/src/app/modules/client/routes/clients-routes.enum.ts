import { Roles } from 'projects/tools/src/public-api';
export enum ClientsRoutes {
  clientsList = 'clients-list',
  newRequests = 'new-requests',
  approvedRequests = 'approved-requests',
  clientDetails = 'client-details',
  bankDetails = 'bank-details',
  sites = 'sites',
  generalDetails = 'general-details',
  guards = 'guards',
  siteDetails = 'sites/site-details',
  locationGuards = 'location-guards',
}

export const ClientRoutesList: {
  name: string;
  link: string;
  roles: string[];
}[] = [
  {
    name: 'clients',
    link: ClientsRoutes.clientsList,
    roles: [Roles.SecuritCompany, Roles.SecurityCompanyUser],
  },
  {
    name: 'new_requests',
    link: ClientsRoutes.newRequests,
    roles: [Roles.VirtualAdmin],
  },
  {
    name: 'branch_requests',
    link: ClientsRoutes.approvedRequests,
    roles: [Roles.SecurityCompanyUser, Roles.SecuritCompany],
  },
];

export const ClientDetailsRoutesList: {
  name: string;
  link: string;
  roles: string[];
}[] = [
  {
    name: 'general_details',
    link: ClientsRoutes.generalDetails,
    roles: [Roles.SecuritCompany, Roles.SecurityCompanyUser],
  },
  // {
  //   name: 'bank_details',
  //   link: ClientsRoutes.bankDetails,
  //   roles: [Roles.SecuritCompany, Roles.SecurityCompanyUser],
  // },
  {
    name: 'sites',
    link: ClientsRoutes.sites,
    roles: [Roles.SecuritCompany, Roles.SecurityCompanyUser],
  },
  {
    name: 'guards',
    link: ClientsRoutes.guards,
    roles: [Roles.SecuritCompany, Roles.SecurityCompanyUser],
  },
];

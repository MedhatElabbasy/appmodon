import { MenuItem } from '../../core/models/menu-item';

export enum ContractsRoutes {
  allContracts = 'all-contracts',
  active = 'active-contracts',
  suspended = 'suspended-contracts',
  rejected = 'rejected-contracts',
}

export const ContractsRoutesList: MenuItem[] = [
  {
    name: 'contracts.all_contracts',
    link: ContractsRoutes.allContracts,
    icon: null,
    image: null,
    children: null,
  },
  {
    name: 'contracts.accepted',
    link: ContractsRoutes.active,
    icon: null,
    image: null,
    children: null,
  },
  {
    name: 'contracts.suspended',
    link: ContractsRoutes.suspended,
    icon: null,
    image: null,
    children: null,
  },
  {
    name: 'contracts.rejected',
    link: ContractsRoutes.rejected,
    icon: null,
    image: null,
    children: null,
  },
];

import { Roles } from 'projects/tools/src/public-api';
import { MenuItem } from '../../core/models/menu-item';

export enum ClientRoutes {
  branches = 'branches',
  orders = 'orders',
  manageBranch = 'manage-branch',
  allOrders = 'all-orders',
  branchOrders = 'branch-orders',
  waitingOrders = 'waiting-orders',
  ClientBranches = 'client-branches',
  manageOrders ='manage-orders',
  orderDetails='order-details'
}

// export const ClientSidebar: MenuItem[] = [
//   {
//     name: 'branches.manage_branches',
//     link: ClientRoutes.branches,
//     icon: 'fa-solid fa-building fs-6 ',
//     image: null,
//     children: null,
//     role: [Roles.VirtualClientAdmin],
//   },
//   {
//     name: 'clients.manage_request',
//     link: ClientRoutes.orders,
//     icon: 'fa-solid fa-clipboard-list',
//     image: null,
//     children: null,
//     role: [Roles.ClientCompanyUser, Roles.VirtualClientAdmin],
//   },
// ];

export const OrderSidebar: MenuItem[] = [
  {
    name: 'clients.all_orders',
    link: ClientRoutes.allOrders,
    icon: 'fa-solid fa-building fs-6 ',
    image: null,
    children: null,
    role: [Roles.VirtualClientAdmin],
  },
  // {
  //   name: 'clients.branch_requests',
  //   link: ClientRoutes.branchOrders,
  //   icon: 'fa-solid fa-building fs-6 ',
  //   image: null,
  //   children: null,
  //   role: [Roles.ClientCompanyUser],
  // },
  {
    name: 'clients.pending_orders',
    link: ClientRoutes.waitingOrders,
    icon: 'fa-solid fa-building fs-6 ',
    image: null,
    children: null,
    role: [Roles.VirtualClientAdmin, Roles.Company],
  },
];

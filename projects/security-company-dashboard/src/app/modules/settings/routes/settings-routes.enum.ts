import { MenuItem } from '../../core/models/menu-item';

export enum SettingsRoutes {
  shifts = 'shifts',
  managment = 'companyEquipment',
  EmergencyContact = 'EmergencyContact',
  //MonitoringComplaints = 'MonitoringComplaints',
}

export enum managmentRoutes {
  managementList = 'companyEquipment-list',
}

export const ManagementRoutesList: MenuItem[] = [
  {
    name: 'managmentTools.tools',
    link: managmentRoutes.managementList,
    icon: null,
    image: null,
    children: null,
  },
];

export enum EmergencyContactRoutes {
  EmergencyContactList = 'EmergencyContact-list',
}

export const EmergencyContactRoutesList: MenuItem[] = [
  {
    name: 'EmergencyContact.numbers',
    link: EmergencyContactRoutes.EmergencyContactList,
    icon: null,
    image: null,
    children: null,
  },
];

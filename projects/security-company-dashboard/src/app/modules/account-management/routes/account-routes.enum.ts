export enum AccountRoutes {
  managementAccount = 'manage-account',
}

export const ACCOUNT_LIST: { name: string; link: string; icon: string }[] = [
  {
    name: 'account_management',
    link: AccountRoutes.managementAccount,
    icon: 'fa-solid fa-gear',
  },
];

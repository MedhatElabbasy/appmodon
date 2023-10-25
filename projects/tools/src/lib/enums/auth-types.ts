export enum AuthTypes {
  Company = 1,
  SecurityGuard = 2,
  SecuritySupervisor = 3,
  SecurityCompany = 4,
  Admin = 5,
  SecurityCompanyUser = 7,
  VirtualAdmin = 8,
}

export enum Roles {
  Company = 'Company',
  SecurityGurd = 'SecurityGurd',
  SecuritySupervisor = 'SecuritySupervisor',
  SecuritCompany = 'SecuritCompany',
  Admin = 'Admin',
  SecurityCompanyUser = 'SecurityCompanyUser',
  VirtualAdmin = 'VirtualAdmin',
  ClientCompanyUser = 'ClientCompanyUser',
  VirtualClientAdmin = 'VirtualClientAdmin',
}

export enum AuthTypeName {
  login = 'login',
  securityGuard = 'register-security-guard',
  registerClient = 'register-client',
  registerSecurityCompany = 'register-security-company',
  SecurityCompanyUser = 'security-company-user',
}

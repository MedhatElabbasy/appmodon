import { CompanySecurityGuard } from './site-details';

export interface GuardLocation {
  id: string;
  siteLocationId: string;
  siteLocation: null;
  companySecurityGuardId: string;
  companySecurityGuard: CompanySecurityGuard;
}

export interface GuardLocationModel {
  siteLocationId: string;
  companySecurityGuardId: string;
}

import { Branch, ClientCompany, SecurityCompany } from 'projects/tools/src/public-api';

export interface Client {
  id: string;
  clientCompany: ClientCompany;
  securityCompany: SecurityCompany;
  securityCompanyBranch: Branch;
}

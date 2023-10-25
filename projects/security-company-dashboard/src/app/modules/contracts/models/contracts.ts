import { Branch, ClientCompany, OptionSetItem, SecurityCompany } from 'projects/tools/src/public-api';

export interface Contract {
  id: string;
  contractNumber: null;
  securityCompanyId: number;
  securityCompany: SecurityCompany;
  clientCompany: ClientCompany;
  startDate: string;
  startDateTime: string;
  startDateSinceTime: string;
  endDate: string;
  endDateTime: string;
  endDateSinceTime: string;
  contractType: any;
  contractStatus: OptionSetItem;
  securityCompanyBranchId: string;
  securityCompanyBranch: Branch;
  rejectReson: string;
}

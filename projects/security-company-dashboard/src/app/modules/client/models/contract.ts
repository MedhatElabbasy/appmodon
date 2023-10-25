import { Branch, ClientCompany, OptionSetItem, SecurityCompany } from 'projects/tools/src/public-api';

export interface Contract {
  id?: string;
  contractNumber?: string;
  securityCompanyId: number;
  securityCompany?: SecurityCompany;
  clientCompany?: ClientCompany;
  startDate: string;
  startDateTime?: string;
  startDateSinceTime?: string;
  endDate: string;
  endDateTime?: string;
  endDateSinceTime?: string;
  contractType?: OptionSetItem;
  contractStatus?: OptionSetItem;
  securityCompanyBranchId: string;
  securityCompanyBranch?: Branch;
}

export interface ContractModel {
  securityCompanyId: number;
  clientCompanyId: number;
  startDate: string;
  endDate: string;
  securityCompanyBranchId: string;
  contractTypeId: string;
  clientOrderId: string;
}

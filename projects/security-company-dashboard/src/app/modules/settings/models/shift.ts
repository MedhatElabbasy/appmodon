import { Lookup, SecurityCompany } from 'projects/tools/src/public-api';

export interface Shift {
  id: string;
  shiftType: Lookup;
  securityCompany: SecurityCompany;
}

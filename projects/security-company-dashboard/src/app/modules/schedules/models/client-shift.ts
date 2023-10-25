import { Client } from '../../client/models/clients';
import { Shift } from '../../settings/models/shift';
import { Schedule } from './schedule';

export interface ClientShift {
  id: string;
  companyShiftId: string;
  companyShift: Shift;
  securityCompanyClientId: string;
  securityCompanyClient: Client;
  shiftStartTime: string;
  shiftEndTime: string;
  schedulings: Schedule[];
}

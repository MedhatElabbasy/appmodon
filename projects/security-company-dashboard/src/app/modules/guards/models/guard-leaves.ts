import { OptionSetItem } from 'projects/tools/src/public-api';
import { CompanySecurityGuard } from '../../client/models/site-details';

export interface GuardLeaves {
  id: string;
  companySecurityGuardId: string;
  companySecurityGuard: CompanySecurityGuard;
  leaveTypeId: string;
  leaveType: OptionSetItem;
  reason: string;
  description: string;
  leavePeriodId: string;
  leavePeriod: OptionSetItem;
  requestDate: string;
  requestDateDateTime: string;
  requestDateSinceTime: string;
  requestEndDate: string;
  requestEndDateDateTime: string;
  requestEndDateSinceTime: string;
  siteSupervisorShiftId: string;
  siteSupervisorShift: null;
  isApproved: boolean;
  approvedStatusId: string;
  approvedStatus: OptionSetItem;
}

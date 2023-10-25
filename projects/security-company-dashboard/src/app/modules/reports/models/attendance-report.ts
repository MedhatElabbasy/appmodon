import {
  CompanySecurityGuard,
  SiteLocation,
} from '../../client/models/site-details';
import { BreakScheduling } from '../../schedules/models/schedule';
import { Guard } from 'projects/security-company-dashboard/src/app/modules/core/models/guard';

export interface AttendanceReport {
  mustStartDateTime: string;
  mustEndDateTime: string;
  id: string;
  isDeleted: boolean;
  startTime: string;
  endTime: string;
  totalWorkTime: string;
  toTalBreakTime: string;
  totalExtraTime: string;
  totalMustWorkTime: string;
  toTalMustBreakTime: string;
  siteLocationId: string;
  siteLocation: SiteLocation;
  companySecurityGuardId: string;
  securityGuard?:Guard,
  companySecurityGuard: CompanySecurityGuard;
  breakLoggers: BreakLogger[];
  attendanceLogers: AttendanceLogers[];
  isComplete: boolean;
  isFirstLog: boolean;
  canLogIn: boolean;
  isOnBreak: boolean;
  lat: string;
  long: string;
  locationTracking: any[];
}

export interface BreakLogger {
  id: string;
  isDeleted: boolean;
  companySecurityGuardId: string;
  companySecurityGuard: CompanySecurityGuard;
  startTime: string;
  endTime: string;
  siteLocationId: string;
  siteLocation: SiteLocation;
  breakSchedulingId: string;
  breakScheduling: BreakScheduling;
  isActiveBreak: boolean;
}

export interface AttendanceLogers {
  id: string;
  isDeleted: boolean;
  startTime: string;
  endTime: string;
  isAttendance: boolean;
  logDate: string;
  attendanceId: string;
  attendance: AttendanceReport;
}

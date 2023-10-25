import { FileObject, OptionSetItem } from 'projects/tools/src/public-api';
import {
  CompanySecurityGuard,
  SiteLocation,
  SiteSupervisorShift,
} from '../../client/models/site-details';

export interface VisitorsReport {
  created: string;
  createdDateTime: string;
  createdSinceTime: string;
  companyName: string;
  id: string;
  companySecurityGuardId: string;
  companySecurityGuard: CompanySecurityGuard;
  siteSupervisorShiftId: string;
  siteSupervisorShift: SiteSupervisorShift;
  visitorId: string;
  visitorType: OptionSetItem;
  visitorName: string;
  hostName: string;
  vistorReason: string;
  enterTime: string;
  leaveTime: string;
  notes: string;
  idPhotoId: number;
  idPhoto: FileObject;
  siteLocationId: string;
  siteLocation: SiteLocation;
}

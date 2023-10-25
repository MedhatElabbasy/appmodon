import { FileObject, OptionSetItem } from 'projects/tools/src/public-api';
import {
  CompanySecurityGuard,
  SiteLocation,
  SiteSupervisorShift,
} from '../../client/models/site-details';

export interface Incident {
  id: string;
  reason: string;
  isDeleted: boolean;
  incidentTypeId: string;
  incidentType: OptionSetItem;
  siteLocationId: string;
  siteLocation: SiteLocation;
  description: string;
  actionToken: string;
  companySecurityGuardId: string;
  companySecurityGuard: CompanySecurityGuard;
  incidentAttachments: IncidentAttachment[];
  siteSupervisorShiftId: string;
  siteSupervisorShift: SiteSupervisorShift;
  created: string;
  createdDateTime: string;
  sinceTime: string;
  gallery: string[];
}

export interface IncidentAttachment {
  id: string;
  attachmentId: number;
  attachment: FileObject;
}

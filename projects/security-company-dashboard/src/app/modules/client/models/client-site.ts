import { FileObject } from 'projects/tools/src/public-api';
import { Client } from './clients';

export interface ClientSite {
  id: string;
  isDeleted: boolean;
  securityCompanyClientId: string;
  securityCompanyClient: Client;
  siteName: string;
  siteAddress: string;
  siteLat: string;
  siteLong: string;
  siteHight: number;
  sitePhotoId: number;
  sitePhoto: FileObject;
  enableGeolocation: boolean;
  geolocationLenghtInMetter: number;
  siteDescription: string;
  totalNumberOfGurds: number;
  statusId: null;
  status: null;
  siteSupervisorShifts: SiteSupervisorShift[];
  siteLocations: SiteLocation[];
}

export interface SiteLocation {
  id: string;
  name: string;
  numberOfGuards: number;
  photoId: number;
  statusId: string;
  clientSiteId: string;
  locationAddress: string;
  locationLat: string;
  locationLong: string;
  locationHight: number;
  photo: FileObject;
}

export interface SiteSupervisorShift {
  clientShiftScheduleId: string;
  companySecurityGuardId: string;
  clientSiteId: string;
}

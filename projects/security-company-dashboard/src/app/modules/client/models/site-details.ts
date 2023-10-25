import { FileObject, Lookup } from 'projects/tools/src/public-api';
import { securityGuard } from '../../jobs/models/job-app';
import { JobType } from '../../jobs/models/job-details.enum';
import { Client } from './clients';
import { AppUser } from './../../agent/model/agent';

export interface SiteDetails {
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
  isDeleted: boolean;
  name: string;
  numberOfGuards: number;
  photoId: number;
  photo: FileObject;
  clientSiteId: string;
  clientSite: any;
  statusId: null;
  status: null;
  locationAddress: string;
  locationLat: string;
  locationLong: string;
  locationHight: number;
}

export interface SiteSupervisorShift {
  id: string;
  clientShiftSchedule: ClientShiftSchedule;
  companySecurityGuard: CompanySecurityGuard;
}

interface ClientShiftSchedule {
  id: string;
  companyShiftId: string;
  companyShift: CompanyShift;
  securityCompanyClientId: string;
  securityCompanyClient: Client;
  shiftStartTime: string;
  shiftEndTime: string;
  schedulings: any[];
}

interface CompanyShift {
  id: string;
  shiftType: ShiftType;
  securityCompany: null;
}

interface ShiftType {
  id: number;
  name: string;
  nameEN: string;
}

export interface CompanySecurityGuard {
  id: string;
  appUser: AppUser;
  securityGuardId: number;
  securityGuard: SecurityGuard;
  isActive: boolean;
  guardStatusId: null;
  guardStatus: null;
  username?: string;
}

interface SecurityGuard {
  id: number;
  isDeleted: boolean;
  firstName: string;
  middleName: null | string;
  lastName: string;
  email: string;
  nationalID: string;
  bloodType: Lookup;
  gender: Lookup;
  city: Lookup;
  jobType: JobType;
  nationality: Lookup;
  birthDate: string;
  appUserId: string;
  appUser: null;
  locations: null;
  lat: null;
  lng: null;
  isActive: boolean;
  photo: FileObject ;
  bankName: null;
  bankOwner: null;
  idPhoto: null;
  bankNumber: null;
  iban: null;
  jobTypeId: number;
}

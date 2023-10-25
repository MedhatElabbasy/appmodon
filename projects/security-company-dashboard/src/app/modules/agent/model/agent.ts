import { securityGuard } from '../../jobs/models/job-app';

export interface CompanySecurityGuard {
  id: string;
  securityGuardId: number;
  securityGuard: securityGuard;
  isActive: boolean;
  guardStatusId: null;
  guardStatus: null;
  username?: string;
}

export interface Agent {
  id: string;
  mobileNumber: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: null | string;
  email: string;
  photo: Photo;
  idPhoto: Photo;
  appUser: AppUser;
  isActive: boolean;
  securityCompany: securityCompany;
  birthDate?: any;
  nationalityId?: number;
  bloodType?: any;
  nationality?: any;
  gender?: any;
  city?: any;
}

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  countryId: null;
  country: null;
  nationality: null;
  userName: string;
  isActive: boolean;
  roles: null;
  email: string;
}

export interface Photo {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}

export interface securityCompany {
  id: number;
  name: string;
  cityId: number;
  address: string;
  areaId: number;
}

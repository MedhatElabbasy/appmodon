import { Branch, FileObject, Lookup, SecurityCompany } from 'projects/tools/src/public-api';
import { JobApplication } from '../../jobs/models/job-app';

export interface Guard {
  id: string;
  securityGuard: SecurityGuard;
  isActive: boolean;
  jobApplication: JobApplication;
  securityCompanyBranchId: string;
  securityCompanyBranch: Branch;
  securityCompanyId: number;
  securityCompany: SecurityCompany;
  isSuperVisor: boolean;
  isSecurityGurad: boolean;
}

interface SecurityGuard {
  id: number;
  isDeleted: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  nationalID: string;
  bloodType: Lookup;
  gender: Lookup;
  city: Lookup;
  jobType: Lookup;
  nationality: string;
  birthDate: string;
  appUserId: string;
  appUser: any;
  locations: string;
  lat: number;
  lng: number;
  isActive: boolean;
  photo: FileObject;
  bankName: string;
  bankOwner: string;
  idPhoto: FileObject;
  bankNumber: string;
  iban: string;
  jobTypeId: number;
  userName: string;
}

import { FileObject } from 'projects/tools/src/public-api';

export interface CompanyUser {
  id: string;
  phoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationalID: string;
  email: string;
  profileImageId: number;
  isActive: boolean;
  appUserId: string;
  cityId: number;
  jobTypeId: number;
  locations: string;
  lat: string;
  lng: string;
  bloodTypeId: number;
  genderId: number;
  nationalityId: number;
  birthDate: string;
  photoId: number;
  areaId: number;
  securityCompanyId: number;
  securityCompanyBranchId: string;
  photo: FileObject;
}

import { FileObject } from 'projects/tools/src/public-api';
import { AppUser } from './security-guard.model';

export interface ClientCompany {
  id: number;
  name: string;
  companyTypeId: number;
  commercialRegistrationNo: number;
  commercialRegistrationNumber: number;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: number;
  appUserId: string;
  appUser?:AppUser;
  photoId: number;
  photo: FileObject;
  address: string;
}

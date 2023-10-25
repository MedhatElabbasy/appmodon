import { ClientBranch } from './client-branch';
import { City, ClientCompany, FileObject, Lookup } from 'projects/tools/src/public-api';
import { AppUser } from '../../auth/models/security-guard.model';

export interface ClientBranchUser {
  fullName :string;
  id: any;
  firstName: string;
  phoneNumber: string;
  middleName: string;
  lastName: string;
  nationalID: string;
  email: string;
  isActive: boolean;
  appUserId: string;
  appUser: AppUser;
  locations: string;
  lat: string;
  lng: string;
  genderId: number;
  gender: Lookup;
  photoId: number;
  photo: FileObject;
  clientCompanyBranchId: string;
  clientCompanyBranch: ClientBranch;
  clientCompanyId: number;
  clientCompany: ClientCompany;
  cityId: number;
  city: City;
}

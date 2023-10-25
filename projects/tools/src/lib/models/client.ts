//import { clientCompany } from 'projects/client-app/src/app/modules/dashboard/models/attencereport';
import { CountryCode } from '../../public-api';
import { FileObject } from './file-object';

export interface ClientCompany {
  id: number;
  name: string;
  companyTypeId: number;
  commercialRegistrationNumber: number;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: number;
  appUserId: string;
  photoId: null;
  photo: FileObject;
  isActive: boolean;
  clientCompanyBranch:clientCompanyBranch;
  clientCompanyId?:number,
  clientCompanyBranchId:string
  clientCompany:clientCompany
}

export interface clientCompany{
  id: 0;
  name: string;
  companyTypeId: 0;
  commercialRegistrationNumber: string;
  activityType: string;
  email: string;
  nationalAddress: string;
  chargePerson: string;
  chargePersonPhoneNumber: string;
  cityId: 0;
  appUserId: string;
  photoId: 0;
  clientCompanyUser:clientCompanyUser
}

export interface clientCompanyUser{
  id: string;
  firstName: string;
  phoneNumber: string;
  middleName: string;
  lastName: string;
  nationalID: string
  email: string;
  isActive: boolean;
  appUserId: string;
  appUser: AppUser;
}

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  countryId: number;
  country: CountryCode;
  nationality: string;
  userName: string;
  isActive: boolean;
  roles: string[];
  email: string;
}

export interface clientCompanyBranch{
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
  
  locations: string;
  lat: string;
  lng: string;
  genderId: number;
 
  photoId: number;
  photo: FileObject;
  clientCompanyBranchId: string;
  isMainBranch:boolean;
  clientCompanyId: number;
  clientCompany: ClientCompany;
  cityId: number;
  securityCompanyBranchId:string

}

import { CountryCode, Lookup, clientCompanyBranch } from 'projects/tools/src/public-api';


export interface SecurityGuard {
  id: number;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  nationalID: string;
  bloodType: Lookup;
  gender: Lookup;
  city: City;
  jobType: JobType;
  nationality: Lookup;
  birthDate: string;
  appUserId: string;
  appUser: AppUser;
  locations: string;
  lat: string;
  lng: string;
  isActive: boolean;
  photo: Photo;
  clientCompanyId?: number
  clientCompanyBranch:clientCompanyBranch,
  clientCompanyBranchId:string,
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

export interface City {
  id: number;
  name: string;
  nameEN: string;
  isDeleted: boolean;
  countryId: number;
  country: CountryCode;
}

export interface JobType {
  id: number;
  name: string;
  nameEN: string;
  fName: string;
  fNameEN: string;
  isDeleted: boolean;
}

export interface Photo {
  id: number;
  imageId: string;
  name: string;
  fullLink: string;
}

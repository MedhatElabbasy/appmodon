
import { FileObject } from "projects/tools/src/public-api";


  
  export interface AttendanceReport {
    mustStartDateTime: string;
    mustEndDateTime: string;
    id: string;
    isDeleted: boolean;
    startTime: string;
    endTime: string;
    totalWorkTime: string;
    toTalBreakTime: string;
    totalExtraTime: string;
    totalMustWorkTime: string;
    toTalMustBreakTime: string;
    siteLocationId: string;
    siteLocation: SiteLocation;
    clientSiteId: string;
    clientSite: ClientSite;
    companySecurityGuard: CompanySecurityGuard;
    breakLogger: BreakLogger;
    attendanceLogers: AttendanceLogers[];
    isComplete: boolean;
    isFirstLog: boolean;
    canLogIn: boolean;
    isOnBreak: boolean;
    lat: string;
    long: string;
    locationTracking: any[];
    name:string;
    guardImage:string;
    scheduleName:string;
    supervisorName:string;
    siteNumber:number;
    siteLocationName:string;
    clientName:string;
    branchName:string;
    securityCompanyName:string;
    guardCode:number;
    nationalId:number;
    phoneNumber:number;
    leaveTime:string;
    shiftName:string;
    totalBreakTime:string;
    mustEndIn:string;
    mustStart:string;
  }

  export interface JobType {
    id: number;
    name: string;
    nameEN: string;
    fName: string;
    fNameEN: string;
    isDeleted: boolean;
  }
  
  export interface BreakLogger {
    id: string;
    isDeleted: boolean;
    companySecurityGuardId: string;
    companySecurityGuard: CompanySecurityGuard;
    startTime: string;
    endTime: string;
    siteLocationId: string;
   // siteLocation: SiteLocation;
    breakSchedulingId: string;
   // breakScheduling: BreakScheduling;
    isActiveBreak: boolean;
  }
  
  export interface AttendanceLogers {
    id: string;
    isDeleted: boolean;
    startTime: string;
    endTime: string;
    isAttendance: boolean;
    logDate: string;
    attendanceId: string;
    attendance: AttendanceReport;
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

  export interface ClientSite{
    id: string;
    isDeleted: true;
    securityCompanyClientId: string;
    securityCompanyClient: securityCompanyClient; 
  }
  
  export interface securityCompanyClient{
    id:string;
    clientCompany:clientCompany;
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

  export interface AppUser{
    id: string;
    firstName: string;
    lastName: string;
    countryId: 0;
    nationality: string;
    userName: string;
    isActive: boolean;
    roles: [string];
    email: string;
  }

  export interface CompanySecurityGuard{
    id:string;
    securityGuard:securityGuard
  }
  
  export interface securityGuard {
    id: number;
    isDeleted: boolean;
    firstName: string;
    middleName: null | string;
    lastName: string;
    lastNameEn:string,
    middleNameEn:string,
    firstNameEN:string,
    email: string;
    nationalID: string;
    bloodType: Lookup;
    gender: Lookup;
    city: Lookup;
    jobType: JobType;
    nationality: Lookup;
    birthDate: string;
    appUserId: string;
    appUser: AppUser;
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

  export interface Lookup {
    id: number;
    name: string;
    nameEN: string;
    isDeleted: true;
  }
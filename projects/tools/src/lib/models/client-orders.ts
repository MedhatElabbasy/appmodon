import { ClientCompany } from './client';
import { FileObject } from './file-object';
import { Lookup } from './lookup';
import { OptionSetItem } from './option-set';
import { SecurityCompany } from './security-company';

export interface ClientOrder {
  id: string;
  email: string;
  location: string;
  longitude: string;
  latitude: string;
  numberOfGurads: number;
  numberOfSupervisors: number;
  numberOrder: string;
  shiftType?: Lookup;
  clientOrderGuardsShifts: any
  startDate: string;
  startDateDateTime: string;
  startDateSinceTime: string;
  endDate: string;
  endDateDateTime: string;
  endDateSinceTime: string;
  details: string;
  clientCompany?: ClientCompany;
  securityCompany?: SecurityCompany;
  contractType?: OptionSetItem;
  orderStatus?: OptionSetItem;
  isApprovedByMainBranch: boolean;
  securityCompanyBranchId: string;
  securityCompanyBranch?: SecurityCompanyBranch;
  isApprovedByClientCompanyMainBranch: boolean;
  cancelReason: string;
  isCanceled: boolean;
}

export interface SecurityCompanyBranch {
  id: string;
  securityCompanyId: number;
  name: string;
  nameEn: string;
  overview: string;
  overviewEn: string;
  address: string;
  locationLat: string;
  locationLng: string;
  photoId: number;
  photo: FileObject;
  stauts: boolean;
  isMainBranch: boolean;
}

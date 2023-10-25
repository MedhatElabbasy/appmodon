import {
  ClientCompany,
  FileObject,
  Lookup,
  OptionSetItem,
  SecurityCompany,
} from 'projects/tools/src/public-api';

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

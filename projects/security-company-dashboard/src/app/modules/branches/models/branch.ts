import { SecurityCompany, FileObject } from 'projects/tools/src/public-api';

export interface Branch {
  id: string;
  securityCompanyId: number;
  securityCompany?: SecurityCompany;
  name: string;
  nameEn: string;
  overview: null | string;
  overviewEn: null | string;
  address: string;
  locationLat: null | string;
  locationLng: null | string;
  photoId: null;
  photo: FileObject;
  stauts: boolean;
  isMainBranch: boolean;
}

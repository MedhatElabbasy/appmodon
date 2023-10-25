import { ClientCompany, FileObject } from 'projects/tools/src/public-api';

export interface ClientBranch {
  id: string;
  clientCompanyId: number;
  clientCompany?: ClientCompany;
  name: string;
  nameEn: string;
  overview: string;
  overviewEn: string;
  address: string;
  locationLat: string;
  locationLng: string;
  photoId: number;
  photo?: FileObject;
  stauts: boolean;
  isMainBranch: boolean;
}

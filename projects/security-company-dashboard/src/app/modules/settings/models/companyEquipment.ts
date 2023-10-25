import { Lookup, SecurityCompany } from 'projects/tools/src/public-api';
import { Attachment } from '../../jobs/models/job-app';

export interface companyEquipment {
  id: string;
  equipmentName: string;
  typeId: number;
  storeNumber: number;
  equipmentType?: Lookup;
  securityCompanyId: number;
  securityCompany?: SecurityCompany;
  description: string;
  equipmentPhotoId: number;
  equipmentPhoto?: Attachment;
}

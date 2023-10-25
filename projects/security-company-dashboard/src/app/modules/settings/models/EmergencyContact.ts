import { Lookup, SecurityCompany } from 'projects/tools/src/public-api';
import { Attachment } from '../../jobs/models/job-app';

export interface EmergencyContact {
  id?: string;
  securityCompanyId: number;
  number: number;
  PhotoId: number;
  photo?: Attachment;
}

import { Branch } from 'projects/tools/src/public-api';

export interface job {
  created: string;
  createdDateTime: string;
  sinceTime: string;
  id: number;
  isDeleted: boolean;
  securityCompanyId: number;
  allJobApplications: null;
  securityCompany?: any;
  jobTypeId: number;
  jobType: JobType;
  jobApplications: any[];
  jobDescription: string;
  jobReqiurement: string;
  locationName: string;
  locationLat: string;
  locationLng: string;
  openJobNumber: number;
  shiftTypeId: number;
  shiftType: Gender;
  experinceReqiured: number;
  genderId: number;
  gender: Gender;
  isSavedJop: boolean;
  jobDescriptionEN: string;
  jobReqiurementEN: string;
  securityCompanyBranch: Branch;
  securityCompanyBranchId: string;
}

export interface Gender {
  id: number;
  name: string;
  nameEN: string;
  isDeleted?: boolean;
}

export interface JobType {
  id: number;
  name: string;
  nameEN: string;
  fName: null;
  fNameEN: null;
  isDeleted: boolean;
}

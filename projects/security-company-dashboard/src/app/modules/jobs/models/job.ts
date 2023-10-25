export interface Job {
  id: number;
  isDeleted: boolean;
  securityCompanyId: number;
  jobTypeId: number;
  jobDescription: string;
  jobReqiurement: string;
  locationName: string;
  locationLat: string;
  locationLng: string;
  openJobNumber: number;
  shiftTypeId: number;
  experinceReqiured: number;
  genderId: number;
  allJobApplications: number;
  jobDescriptionEN: string;
  jobReqiurementEN: string;
  created: string;
}

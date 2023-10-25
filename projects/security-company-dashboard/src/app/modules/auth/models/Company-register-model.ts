export interface CompanyRegisterModel {
  'personal-details': Details;
  'company-details': Details;
  'other-details': OtherDetails;
  'bank-details': BankDetails;
}

export interface BankDetails {
  accountHolderName: string;
  bankName: string;
  bankCode: string;
  taxNumber: string;
  bankBranch: string;
  accountName: string;
  iban: string;
  idProofId: null;
}

export interface Details {
  image: null;
  firstName: null;
  lastName: null;
  email: null;
  cityLuId: null;
  areaLuId: null;
  businessType: null;
  mobileNumber: null;
}

export interface OtherDetails {
  companyStartDate: null;
  financeYearId: null;
  name: null;
  companyContactNumber: null;
  timeZoneLuId: null;
  postalCode: null;
  commercialRegisterId: null;
  companyLogoId: null;
}

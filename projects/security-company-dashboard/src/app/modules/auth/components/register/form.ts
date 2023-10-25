import { FormStep } from '../../models/form-step.model';
import { AuthRoutes } from '../../routes/auth-routes.enum';

export const CompanyRegisterForm = {
  personalDetails: {
    key: AuthRoutes.PersonalDetails,
    title: 'personal_details',
    description: 'personal_details_desc',
    path: AuthRoutes.PersonalDetails,
    icon: 'assets/images/svg/user.svg',
    order: 1,
    prev: null,
    next: AuthRoutes.CompanyDetails,
  },

  companyDetails: {
    key: AuthRoutes.CompanyDetails,
    title: 'company_details',
    description: 'company_details_desc',
    path: AuthRoutes.CompanyDetails,
    icon: 'assets/images/svg/bag.svg',
    order: 2,
    prev: AuthRoutes.PersonalDetails,
    next: AuthRoutes.OtherDetails,
  },

  otherDetails: {
    key: AuthRoutes.OtherDetails,
    title: 'other_details',
    description: 'other_details_desc',
    icon: 'assets/images/svg/Document.svg',
    order: 3,
    path: AuthRoutes.OtherDetails,
    prev: AuthRoutes.CompanyDetails,
    next: AuthRoutes.BankDetails,
  },

  bankDetails: {
    key: AuthRoutes.BankDetails,
    title: 'bank_details',
    description: 'bank_details_desc',
    icon: 'assets/images/svg/bank.svg',
    order: 4,
    path: AuthRoutes.BankDetails,
    prev: AuthRoutes.OtherDetails,
    next: null,
  },
};

export function getFirstStep(obj: any) {
  for (const key in obj) {
    if (obj[key].order === 1) return obj[key];
  }
}

export function lastStep(obj: any) {
  for (const key in obj) {
    if (!obj[key].next) return obj[key];
  }
}

export function convertConfigurationsToArray(obj: any): FormStep[] {
  let result = Object.keys(obj).map(function (index) {
    let person = obj[index];

    return person;
  });

  return result.sort((a, b) => a - b);
}

export function numberOfSteps() {
  return Object.keys(CompanyRegisterForm).length;
}

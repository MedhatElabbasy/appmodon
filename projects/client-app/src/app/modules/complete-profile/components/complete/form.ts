import { FormStep } from '../../../auth/models/form-step.model';
import { AuthRoutes } from '../../../auth/routes/auth-routes.enum';
//import { FormStep } from './../../../auth/models/form-step.model';
export const completeForm = {
  companyDetails: {
    key: AuthRoutes.CompanyDetails,
    title: 'company_details',
    description: 'company_details_desc',
    icon: 'assets/images/svg/Subtraction 3.svg',
    order: 1,
  },
  companyRepresentative: {
    title: 'company_representative',
    description: 'company_representative_desc',
    icon: 'assets/images/svg/Group 2318.svg',
    order: 2,
  },
  commissionerRepresentative: {
    title: 'commissioner_representative',
    description: 'commissioner_representative_desc',
    icon: 'assets/images/svg/user.svg',
    order: 3,
  },
};

export const securityAudit={
securityAuditModel:{
  title:'model1',
  order: 1
},
securityAuditModelstep2:{
  title:'model2',
  order:2
},
securityAuditModelstep3:{
  title:'model3',
  order:3
},
securityAuditForm:{
  title:'model4',
  order:3
},
securityAuditPhotos:{
  title:'model4',
  order:4
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
  return Object.keys(completeForm).length;
}

export function numberSteps() {
  return Object.keys(securityAudit).length;
}
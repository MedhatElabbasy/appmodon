import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkBoxFilter',
})
export class CheckBoxFilterPipe implements PipeTransform {
  transform(companies: any[], checked: any[]): unknown {
    return companies.filter((company: any) => {
      company.securitCompanyAvailableServices.filter((servise:any) => {
        for(let i=0;i<checked.length;i++){
          servise.id==checked[i]
        }
      });
    });
  }
}

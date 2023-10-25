import { Pipe, PipeTransform } from '@angular/core';
import { tap } from 'rxjs';
import { LangService, language, StorageKeys } from 'projects/tools/src/public-api';

@Pipe({
  name: 'timeDetails',
})
export class TimeDetailsPipe implements PipeTransform {
  constructor(private lang: LangService) {}
  transform(time: string, flag?: any): any {
    let arr = time.split(':');
    if (flag) {
      return this.convert(arr, flag);
    } else {
      flag = localStorage.getItem(StorageKeys.lang) == language.ar;
      return this.convert(arr, flag);
    }
  }

  convert(arr: string[], flag: boolean) {
    let res;
    if (flag) {
      return (res = `${arr[0] ? `${+arr[0]} ساعة` : ''} ${
        +arr[1] ? `${+arr[1]} دقيقة` : ''
      } `);
    } else {
      return (res = `${arr[0] ? `${+arr[0]} h` : ''} ${
        +arr[1] ? `${+arr[1]} m` : ''
      } `);
    }
  }
}

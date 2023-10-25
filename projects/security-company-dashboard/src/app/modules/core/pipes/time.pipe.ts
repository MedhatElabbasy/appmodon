import { Pipe, PipeTransform } from '@angular/core';
import { LangService, language, StorageKeys } from 'projects/tools/src/public-api';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  constructor(private lang: LangService) {}
  transform(time: string, flag?: any): unknown {
    let now = new Date();
    let nowDateTime = now.toISOString();
    let nowDate = nowDateTime.split('T')[0];

    var target = new Date(nowDate + 'T' + time);

    if (flag) {
      return this.convert(target, flag);
    } else {
      flag =localStorage.getItem(StorageKeys.lang) == language.ar;
      return this.convert(target, flag);
    }
  }

  convert(target: Date, flag: boolean) {
    if (flag) {
      return target.toLocaleString('ar-EG', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    } else {
      return target.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    }
  }
}

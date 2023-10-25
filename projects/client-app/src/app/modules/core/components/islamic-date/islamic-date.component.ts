import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarIslamicCivil,
  NgbDatepickerI18n,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-islamic-date',
  templateUrl: './islamic-date.component.html',
  styleUrls: ['./islamic-date.component.scss'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
  ],
})
export class IslamicDateComponent implements OnInit {
  model!: NgbDateStruct;
  @Input('FormControl') formControl!: FormControl;
  @Output('change') change = new EventEmitter();
  minDate: NgbDateStruct = {
    year: 1350,
    day: 1,
    month: 1,
  };

  maxDate!: NgbDateStruct;

  constructor(private calendar: NgbCalendar) {
    let _year = this.calendar.getToday().year - 19;
    this.maxDate = {
      year: _year,
      month: 12,
      day: 30,
    };
  }

  ngOnInit(): void {}

  changeListener() {
    let date =
      this.model.month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      this.model.day.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      this.model.year.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    this.change.next(date);
    if (this.formControl) {
      this.formControl.setValue(date);
    }
  }
}

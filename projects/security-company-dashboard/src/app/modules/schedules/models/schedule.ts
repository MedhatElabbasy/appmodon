import { OptionSetItem } from 'projects/tools/src/public-api';

export interface Schedule {
  id: string;
  clientShiftScheduleId: string;
  name: string;
  nameEn: string;
  isFriday: boolean;
  isMonday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isThursday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  breakScheduling: BreakScheduling[];
  isPerDayExtraTimeEnabled: boolean;
  perDayExtraTime: any;
  isPerWeekExtraTimeEnabled: boolean;
  perWeekExtraTime: any;
  timeForRest: boolean;
  extraTimeForVacations: boolean;
}

export interface BreakScheduling {
  id: string;
  restPaymentTypeId: string;
  name: string;
  nameEn: string;
  breakTime: string;
  restPaymentType: OptionSetItem;
}

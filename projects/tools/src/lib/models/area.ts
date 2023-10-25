import { City } from './city';

export interface Area {
  id: number;
  name: string;
  nameEN: string;
  cityId: number;
  city: City;
  isDeleted: boolean;
}

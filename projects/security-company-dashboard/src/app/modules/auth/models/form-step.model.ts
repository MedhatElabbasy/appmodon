export interface FormStep {
  key: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  order: number;
  prev?: string | null;
  next?: string | null;
  prevFormName?: string;
  componentRef?: any;
}

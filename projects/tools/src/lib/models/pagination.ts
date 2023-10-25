export interface Pagination<T> {
  data: T[];
  totalCount: number;
  countInPage: number;
  page: number;
  pageSize: number;
}

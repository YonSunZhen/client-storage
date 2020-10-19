export interface AdResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface AdSortOption {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}

export interface AdPagingData<T> {
  content: Array<T>;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: Array<AdSortOption>;
  totalElements: number;
  totalPages: number;
}

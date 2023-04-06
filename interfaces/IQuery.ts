export interface IPaginationQuery {
  skip: number;
  take: number;
}

export interface WhereUniqueQuery {
  id?: number;
  uid?: string;
}

export declare const SortOrder: {
  asc: 'asc';
  desc: 'desc';
};

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

export interface ISearchQuery<T> {
  page?: number;
  size?: number;
  orderBy?: keyof T;
  sortBy?: SortOrder;
}

export type IOrderBy<T> = {
  [key in keyof T]: SortOrder;
};

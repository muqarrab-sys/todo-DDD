import { DEFAULT_PAGE_LIMIT } from '../../Application/Constants';

export interface IPaginationQuery {
  skip: number;
  take: number;
}

export default class Pagination {
  static convertToSqlQuery(page: number, limit: number): IPaginationQuery {
    if (!page) return;

    return {
      skip: limit * (page - 1),
      take: limit || DEFAULT_PAGE_LIMIT,
    };
  }
}

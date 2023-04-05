import { DEFAULT_PAGE_SIZE } from '@Infrastructure/Constants';
import { IPaginationQuery } from '@interfaces/IQuery';

export default class Pagination {
  static offsetPaginationQuery(page: number, size: number): IPaginationQuery {
    if (!page) return;

    return {
      skip: size * (page - 1),
      take: size || DEFAULT_PAGE_SIZE,
    };
  }
}

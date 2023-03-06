import { expect } from 'chai';
import Pagination from '../../../src/Infrastructure/Utils/Pagination';

describe('pagination', () => {
  it('returns query for offset pagination', () => {
    const query = Pagination.offsetPaginationQuery(1, 10);

    expect(query.skip).to.equal(0);
    expect(query.take).to.equal(10);
  });
});

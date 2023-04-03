import { IDatabaseClient } from '../../interfaces/IDatabaseClient';

export default class MockDatabase implements IDatabaseClient {
  client: any;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

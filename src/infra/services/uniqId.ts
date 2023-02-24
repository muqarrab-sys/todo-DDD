import { v4 as uuidv4 } from 'uuid';

export default class UniqId {
  constructor() {}

  generate(): string {
    return uuidv4();
  }
}

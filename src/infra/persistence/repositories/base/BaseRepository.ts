import { Document, Model, QueryOptions } from 'mongoose';

abstract class BaseRepository<T, S = Model<T>> {
  protected model: S;

  constructor(model: S) {
    this.model = model;
  }

  abstract create(obj: T): Promise<Document<unknown, any, T> & T>;

  abstract find(id: string): Promise<Document<unknown, any, T> & T>;

  abstract update(id: string, obj: T, options: QueryOptions<T>): Promise<Document<unknown, any, T> & T>;

  abstract delete(id: string): Promise<Document<unknown, any, T> & T>;
}

export default BaseRepository;

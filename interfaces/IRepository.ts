export default interface IRepository<T> {
  save(t: T): Promise<any>;
  delete(id: string | number): Promise<any>;
  count: (t: T) => Promise<number>;
  update: (id: string | number, obj: T) => Promise<T>;
}

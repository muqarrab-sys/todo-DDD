abstract class DatabaseAdopter {
  protected module: any;
  protected url: string;

  constructor() {}

  abstract connect(options?: {}): Promise<any>;
}

export default DatabaseAdopter;

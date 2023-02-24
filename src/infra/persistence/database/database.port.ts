abstract class DatabasePort {
  protected module: any;
  protected url: string;

  constructor() {}

  abstract connect(options?: {}): Promise<any>;
}

export default DatabasePort;

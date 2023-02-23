import { CompileModelOptions, FlatRecord, model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

class ModelFactory<T> {
  constructor(
    private readonly name: string,
    private readonly schemaObj: SchemaDefinition<any> | T,
    private readonly schemaOptions?: SchemaOptions<FlatRecord<T>>,
    private readonly collection?: string,
    private readonly modelOptions?: CompileModelOptions,
  ) {}

  create() {
    const schema = new Schema<T>(this.schemaObj, this.schemaOptions);

    return model<T>(this.name, schema, this.collection, this.modelOptions);
  }
}

export default ModelFactory;

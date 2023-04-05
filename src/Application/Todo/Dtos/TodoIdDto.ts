import { IdObject } from '@interfaces/index';
import { IsString } from 'class-validator';

export default class TodoIdDto implements IdObject {
  @IsString() uid: string;
}

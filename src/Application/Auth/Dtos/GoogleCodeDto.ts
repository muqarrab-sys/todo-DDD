import { GoogleCodeObject } from '@interfaces/user';
import { IsString } from 'class-validator';

export default class GoogleCodeDto implements GoogleCodeObject {
  @IsString() code: string;
}

import { GoogleCodeObject } from '@interfaces/User';
import { IsString } from 'class-validator';

export default class GoogleCodeDto implements GoogleCodeObject {
  @IsString() code: string;
}

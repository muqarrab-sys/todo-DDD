import { IsBoolean, IsString } from 'class-validator';
import { ITodoCreationObject } from '../types';

export class TodoCreationDto implements ITodoCreationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() userId: string;
  @IsBoolean() active: boolean;
}

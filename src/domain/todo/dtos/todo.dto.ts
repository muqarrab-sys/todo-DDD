import { IsBoolean, IsString } from 'class-validator';
import { ITodoCreation } from '../types';

export class TodoCreationDto implements ITodoCreation {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() userId: string;
  @IsBoolean() active: boolean;
}

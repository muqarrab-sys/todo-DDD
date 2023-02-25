import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ITodoCreationObject, ITodoSearchObject } from '../types';

export class TodoCreationDto implements ITodoCreationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() active: boolean;
}

export class TodoSearchDto implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() limit: number;
}

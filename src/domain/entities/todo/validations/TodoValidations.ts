import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ITodoValidationObject, ITodoSearchObject } from '../types';

export class TodoCreationValidation implements ITodoValidationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

export class TodoFindValidation {
  @IsString() id: string;
}

export class TodoSearchDto implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() limit: number;
}

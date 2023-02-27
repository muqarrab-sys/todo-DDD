import SharedUtils from '@/infrastructure/utils/SharedUtils';
import { SortOrder } from '@/interfaces';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ITodoValidationObject, ITodoSearchObject, ITodoIdValidationObject, ITodoUpdateValidationObject, ITodoOrderBy } from '../types';

export class TodoCreationValidation implements ITodoValidationObject {
  @IsString() title: string;
  @IsString() description: string;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

export class TodoIdValidation implements ITodoIdValidationObject {
  @Transform(({ value }) => Number(value)) @IsNumber() id: number;
}

export class TodoSearchValidation implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() limit: number;
  @Transform(({ value }) => SharedUtils.convertToBoolean(value)) @IsBoolean() isCompleted: boolean;
  @IsString() orderBy?: ITodoOrderBy;
  @IsString() sortBy?: SortOrder;
}

export class TodoUpdateValidation implements ITodoUpdateValidationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

import SharedUtils from '@/infrastructure/utils/SharedUtils';
import { IdObject } from '@interfaces/index';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ITodoSearchObject, TodoAttributes, TodoCreationObject, TodoUpdateObject } from '../../../../../interfaces/todo';

export class TodoCreationValidation implements TodoCreationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

export class TodoIdValidation implements IdObject {
  @Transform(({ value }) => Number(value)) @IsNumber() id: number;
}

export class TodoSearchValidation implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() limit: number;
  @Transform(({ value }) => SharedUtils.convertToBoolean(value)) @IsBoolean() isCompleted: boolean;
  @IsString() orderBy?: TodoAttributes;
  @IsString() sortBy?: SortOrder;
}

export class TodoUpdateValidation implements TodoUpdateObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

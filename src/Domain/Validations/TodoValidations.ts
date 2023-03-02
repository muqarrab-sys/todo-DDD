import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { IdObject, SortOrder } from '@interfaces/index';
import { ITodoSearchObject, KeysOfTodo, TodoCreationObject, TodoUpdateObject } from '@interfaces/todo';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString, IsOptional } from 'class-validator';

export class TodoCreationValidation implements TodoCreationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsOptional() @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

export class TodoIdValidation implements IdObject {
  @Transform(({ value }) => Number(value)) @IsNumber() id: number;
}

export class TodoSearchValidation implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() limit: number;
  @Transform(({ value }) => SharedUtils.convertToBoolean(value)) @IsBoolean() isCompleted: boolean;
  @IsString() orderBy?: KeysOfTodo;
  @IsString() sortBy?: SortOrder;
}

export class TodoUpdateValidation implements TodoUpdateObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

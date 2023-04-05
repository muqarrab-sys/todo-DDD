import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { IdObject, SortOrder } from '@interfaces/index';
import { ITodoSearchObject, TodoAttributes, TodoCreationObject, TodoUserInput } from '@interfaces/todo';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString, IsOptional } from 'class-validator';

export class TodoCreationDto implements TodoCreationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsOptional() @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

export class TodoIdDto implements IdObject {
  @IsString() uid: string;
}

export class TodoSearchDto implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() size: number;
  @Transform(({ value }) => SharedUtils.convertToBoolean(value)) @IsBoolean() isCompleted: boolean;
  @IsString() orderBy?: TodoAttributes;
  @IsString() sortBy?: SortOrder;
}

export class TodoUpdateDto implements Partial<TodoUserInput> {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

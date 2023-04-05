import SharedUtils from '@Infrastructure/Utils/SharedUtils';
import { SortOrder } from '@interfaces/index';
import { ITodoSearchObject, TodoAttributes } from '@interfaces/todo';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export default class TodoSearchDto implements ITodoSearchObject {
  @Transform(({ value }) => Number(value)) @IsNumber() page: number;
  @Transform(({ value }) => Number(value)) @IsNumber() size: number;
  @Transform(({ value }) => SharedUtils.convertToBoolean(value)) @IsBoolean() isCompleted: boolean;
  @IsString() orderBy?: TodoAttributes;
  @IsString() sortBy?: SortOrder;
}

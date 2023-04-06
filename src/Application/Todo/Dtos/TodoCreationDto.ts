import { TodoCreationObject } from '@interfaces/Todo';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export default class TodoCreationDto implements TodoCreationObject {
  @IsString() title: string;
  @IsString() description: string;
  @IsOptional() @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

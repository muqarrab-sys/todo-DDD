import { TodoUserInput } from '@interfaces/Todo';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export default class TodoUpdateDto implements Partial<TodoUserInput> {
  @IsString() title: string;
  @IsString() description: string;
  @IsBoolean() isCompleted?: boolean;
  @Transform(({ value }) => new Date(value)) @IsDate() dueDate: Date;
}

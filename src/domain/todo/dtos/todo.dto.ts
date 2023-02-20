import { IsBoolean, IsString } from 'class-validator';
import { ITodo } from '../todo.model';

export class TodoCreationDto implements ITodo {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() userId: string;
  @IsBoolean() active: boolean;
}

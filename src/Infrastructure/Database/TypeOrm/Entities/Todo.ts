import { ITodo } from '@interfaces/Todo';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Todo implements ITodo {
  @PrimaryGeneratedColumn() id: number;
  @PrimaryColumn() uid: string;
  @Column() title: string;
  @Column() description: string;
  @Column() active: boolean;
  @Column() isCompleted: boolean;
  @Column() dueDate: Date;
  @Column() userId: string;
  @Column() createdAt: Date;
  @Column() updatedAt: Date;

  @ManyToOne(() => User, user => user.todos) user: User;
}

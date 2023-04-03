import { IUser } from '@interfaces/user';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Todo from './Todo';

@Entity()
export default class User implements IUser {
  @PrimaryGeneratedColumn() id: number;
  @PrimaryColumn() uid: string;
  @Column() name: string;
  @Column() email: string;
  @Column({ nullable: true }) password: string;
  @Column({ nullable: true }) gender: string;
  @Column({ nullable: true }) dob: Date;
  @Column({ nullable: true }) googleId: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @OneToMany(() => Todo, todo => todo.user) todos: Todo[];
}

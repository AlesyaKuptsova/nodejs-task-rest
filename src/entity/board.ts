import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardColumn } from './column';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @OneToMany(() => BoardColumn, column => column.board, {cascade: true})
  columns!: BoardColumn[];
}

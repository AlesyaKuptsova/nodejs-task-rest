import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from "./board";

@Entity()
export class BoardColumn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  index!: number;

  @ManyToOne(() => Board, board => board.columns,  { onDelete: 'CASCADE' })
  @JoinColumn()
  board!: Board;
}
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({nullable: true, type: 'text',})
  userId!: string | null;

  @Column()
  boardId!: string;

  @Column({nullable: true, type: 'text',})
  columnId!: string | null;
}

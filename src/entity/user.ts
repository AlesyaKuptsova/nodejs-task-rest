import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column('varchar')
    name!: string;

    @Column('varchar')
    login!: string;

    @Column('varchar')
    password!: string;
}
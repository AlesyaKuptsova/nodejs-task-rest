import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnIndex1624794219512 implements MigrationInterface {
    name = 'ColumnIndex1624794219512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_column" ADD "index" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_column" DROP COLUMN "index"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class Authentication1624718746051 implements MigrationInterface {
    name = 'Authentication1624718746051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "passwordHash"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "passwordHash" TO "password"`);
    }

}

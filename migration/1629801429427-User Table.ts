import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1629801429427 implements MigrationInterface {
    name = 'UserTable1629801429427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_model" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "encPassword" character varying NOT NULL, CONSTRAINT "PK_7d6bfa71f4d6a1fa0af1f688327" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_model"`);
    }

}

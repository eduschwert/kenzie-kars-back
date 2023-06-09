import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1686336195007 implements MigrationInterface {
    name = 'NewMigration1686336195007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" date`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "deletedAt" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}

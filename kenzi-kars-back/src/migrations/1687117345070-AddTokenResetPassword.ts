import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTokenResetPassword1687117345070 implements MigrationInterface {
    name = 'AddTokenResetPassword1687117345070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "resetToken" TO "tokenResetPassword"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "tokenResetPassword" TO "resetToken"`);
    }

}

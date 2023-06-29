import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687711868089 implements MigrationInterface {
    name = 'InitialMigration1687711868089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "cpf" character varying(14) NOT NULL, "phone" character varying(16) NOT NULL, "birthdate" date NOT NULL, "description" text NOT NULL, "is_seller" boolean NOT NULL DEFAULT false, "tokenResetPassword" text, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(9) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(50) NOT NULL, "street_number" character varying(50) NOT NULL, "street_name" character varying(50) NOT NULL, "complement" character varying(50) NOT NULL DEFAULT 'no complement', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "userId" uuid, CONSTRAINT "REL_95c93a584de49f0b0e13f75363" UNIQUE ("userId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image_url" character varying(256) NOT NULL, "image_number" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleId" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "year" character varying(4) NOT NULL, "fuel" integer NOT NULL, "mileage" integer NOT NULL, "color" character varying(30) NOT NULL, "fipe_price" numeric NOT NULL, "price" numeric NOT NULL, "description" text NOT NULL, "cover_image" character varying(256) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_good_buy" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sellerId" uuid, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ownerId" uuid, "vehicleId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_f8239c66e6363f66f00eb581265" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_61e24c4e582f894144817a4712a" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_c3e176b501c43e0f48a04f58c0e" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1780f918d3523791d18590d67a4" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1780f918d3523791d18590d67a4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_c3e176b501c43e0f48a04f58c0e"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_61e24c4e582f894144817a4712a"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_f8239c66e6363f66f00eb581265"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

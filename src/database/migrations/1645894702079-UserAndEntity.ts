import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAndEntity1645894702079 implements MigrationInterface {
    name = 'UserAndEntity1645894702079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."materials_type_enum" AS ENUM('COMPUTER', 'MULTI_SOCKET', 'MOUSE', 'CABLE', 'CHAIR', 'DECK', 'TABLE')`);
        await queryRunner.query(`CREATE TYPE "public"."materials_status_enum" AS ENUM('USED', 'DAMAGED', 'NEW', 'DISTRIBUTED')`);
        await queryRunner.query(`CREATE TABLE "materials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "type" "public"."materials_type_enum" NOT NULL, "status" "public"."materials_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b614bb357c5d8741a1a381385c" UNIQUE ("name"), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'SCHOOL_ACCOUNTANT')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "avatar_url" character varying, "is_verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "materials"`);
        await queryRunner.query(`DROP TYPE "public"."materials_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."materials_type_enum"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSupplierTable1741317993347 implements MigrationInterface {
    name = 'CreateSupplierTable1741317993347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" uuid NOT NULL, "name" character varying NOT NULL, "logo_url" character varying NOT NULL, "state" character varying NOT NULL, "cost_per_kwh" numeric(20,4) NOT NULL, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}

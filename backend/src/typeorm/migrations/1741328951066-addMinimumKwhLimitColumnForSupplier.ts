import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMinimumKwhLimitColumnForSupplier1741328951066 implements MigrationInterface {
    name = 'AddMinimumKwhLimitColumnForSupplier1741328951066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" ADD "minimum_kwh_limit" numeric(20,4) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "suppliers" DROP COLUMN "minimum_kwh_limit"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniquePartialIndexCustomer1741366395678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE UNIQUE INDEX unique_active_customer_supplier
          ON customer_supplier_history (customer_id)
          WHERE deleted_at IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP INDEX unique_active_customer_supplier;
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableCustomerSupplierHistory1741366181438 implements MigrationInterface {
    name = 'AddTableCustomerSupplierHistory1741366181438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_supplier_history" ("id" uuid NOT NULL, "customer_id" uuid NOT NULL, "supplier_id" uuid NOT NULL, "rating" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "customerId" uuid, "supplierId" uuid, CONSTRAINT "PK_2c2515404558daa73e6e6423eb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer_supplier_history" ADD CONSTRAINT "FK_757b343c1525d56f84a29dbb12d" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_supplier_history" ADD CONSTRAINT "FK_1c2a1d19c29c1d073efb9020a32" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_supplier_history" DROP CONSTRAINT "FK_1c2a1d19c29c1d073efb9020a32"`);
        await queryRunner.query(`ALTER TABLE "customer_supplier_history" DROP CONSTRAINT "FK_757b343c1525d56f84a29dbb12d"`);
        await queryRunner.query(`DROP TABLE "customer_supplier_history"`);
    }

}

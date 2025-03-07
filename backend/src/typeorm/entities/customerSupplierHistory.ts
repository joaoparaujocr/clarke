import { Entity, ManyToOne, Column, CreateDateColumn, DeleteDateColumn, PrimaryColumn, BaseEntity } from "typeorm";
import Customer from "./customer";
import Supplier from "./supplier";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuid } from "uuid";

@ObjectType()
@Entity()
export default class CustomerSupplierHistory extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  id: string;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.supplierHistory)
  @Column({ name: 'customer_id', type: 'uuid' })
  customer: Customer;

  @Field(() => Supplier)
  @ManyToOne(() => Supplier, (supplier) => supplier.customerHistory)
  @Column({ name: 'supplier_id', type: 'uuid' })
  supplier: Supplier;

  @Column({ type: "int", nullable: true })
  rating: number | null;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;

  constructor() {
    super();
    if (!this.id) this.id = uuid()
  }
}
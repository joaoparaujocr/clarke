import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuid } from "uuid";
import CustomerSupplierHistory from "./customerSupplierHistory";

@ObjectType()
@Entity('suppliers')
export default class Supplier extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string

  @Field(() => String)
  @Column({ type: 'varchar', name: 'logo_url' })
  logoUrl: string

  @Field(() => String)
  @Column({ type: 'varchar' })
  state: string

  @Field(() => Number)
  @Column({ type: 'decimal', name: 'cost_per_kwh', precision: 20, scale: 4 })
  costPerKwh: number

  @Field(() => Number)
  @Column({ type: 'decimal', name: 'minimum_kwh_limit', precision: 20, scale: 4 })
  minimumKwhLimit: number

  @Field(() => [CustomerSupplierHistory], { nullable: true })
  @OneToMany(() => CustomerSupplierHistory, (history) => history.supplier)
  customerHistory: CustomerSupplierHistory[]

  constructor() {
    super();
    if (!this.id) this.id = uuid()
  }
}
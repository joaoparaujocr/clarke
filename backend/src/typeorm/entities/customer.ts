import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('customers')
export default class Customer extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  id: string

  @Field(() => String)
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string

  @Field(() => String)
  @Column({ name: 'last_name', type: 'varchar'})
  lastName: string

  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  email: string

  @Column(() => String)
  password: string

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
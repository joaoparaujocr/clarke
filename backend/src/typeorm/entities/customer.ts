import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('customers')
export default class Customer extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('uuid')
  id: string

  @Field()
  @Column({ name: 'first_name' })
  firstName: string

  @Field()
  @Column({ name: 'last_name' })
  lastName: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
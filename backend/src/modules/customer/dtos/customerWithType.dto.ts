import Customer from "@typeorm/entities/customer"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class CustomerWithType extends Customer {
  @Field(() => String)
  type: string
}
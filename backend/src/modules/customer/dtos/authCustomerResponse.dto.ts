import Customer from "@typeorm/entities/customer";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthCustomerResponse {
  @Field(() => String)
  token: string

  @Field(() => Customer)
  customer: Customer
}
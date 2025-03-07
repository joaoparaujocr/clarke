import Supplier from "@typeorm/entities/supplier";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ResponseGetAllSupplier extends Supplier {
  @Field(() => Number)
  evaluationAverage: number
}
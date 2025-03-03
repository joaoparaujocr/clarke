import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class AuthCustomerInput {
  @Field(() => String)
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string

  @Field(() => String)
  @IsNotEmpty({ message: "password is required" })
  password: string
}
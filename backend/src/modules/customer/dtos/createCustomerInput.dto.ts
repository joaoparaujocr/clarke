import { Field, InputType } from "type-graphql";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  @IsNotEmpty({ message: "First name is required" })
  @IsString({ message: "First name must be a string" })
  firstName: string;

  @Field(() => String)
  @IsNotEmpty({ message: "Last name is required" })
  @IsString({ message: "Last name must be a string" })
  lastName: string;

  @Field(() => String)
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @Field(() => String)
  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  password: string;
}

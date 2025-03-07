import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class CreateSupplierInput {
  @Field(() => String)
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  name: string;

  @Field(() => String)
  @IsNotEmpty({ message: "State is required" })
  @IsString({ message: "State must be a string" })
  state: string;

  @Field(() => Number)
  @IsNotEmpty({ message: "Cost Per kWh is required" })
  @IsNumber(undefined, { message: 'Cost Per kWh must be a number' })
  costPerKwh: number;

  @Field(() => Number)
  @IsNotEmpty({ message: "Minimum kwh limit is required" })
  @IsNumber(undefined, { message: 'Minimum kwh limit must be a number' })
  minimumKwhLimit: number;

  @Field(() => String)
  @IsNotEmpty({ message: "Logo is required" })
  @IsUrl({ protocols: ['https'] }, { message: 'Logo must be a url' })
  logoUrl: string;
}
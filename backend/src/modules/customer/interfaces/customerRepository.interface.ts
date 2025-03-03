import Customer from "@typeorm/entities/customer";
import { CreateCustomerInput } from "../dtos/createCustomerInput.dto";

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>
  create(data: CreateCustomerInput): Promise<Customer>
  findByEmail(email: string): Promise<Customer | null>
}
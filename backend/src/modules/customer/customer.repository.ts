import Customer from "@typeorm/entities/customer";
import { ICustomerRepository } from "./interfaces/customerRepository.interface";
import { CreateCustomerInput } from "./dtos/createCustomerInput.dto";
import { injectable } from "tsyringe";

@injectable()
export class CustomerRepository implements ICustomerRepository {
  async findAll() {
    return await Customer.find()
  }

  async create(data: CreateCustomerInput) {
    const customer = Customer.create({ ...data });

    await customer.save();

    return customer;
  }

  async findByEmail(email: string) {
    return await Customer.findOneBy({ email })
  }

  async findById(id: string) {
    return await Customer.findOneBy({ id })
  }
}
import Supplier from "@typeorm/entities/supplier";
import { inject, injectable } from "tsyringe";
import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateSupplierInput } from "./dtos/createSupplierInput.dto";
import { validateOrReject } from "class-validator";
import { SupplierService } from "./supplier.service";

@injectable()
@Resolver()
export default class SupplierResolver {
  constructor(@inject(SupplierService) private readonly supplierServiceSupplierService: SupplierService) { }

  @Mutation(() => Supplier)
  async createSupplier(@Arg("data", () => CreateSupplierInput) data: CreateSupplierInput) {
    await validateOrReject(data);

    return await this.supplierServiceSupplierService.create(data)
  }
}
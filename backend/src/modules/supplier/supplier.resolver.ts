import Supplier from "@typeorm/entities/supplier";
import { inject, injectable } from "tsyringe";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CreateSupplierInput } from "./dtos/createSupplierInput.dto";
import { validateOrReject } from "class-validator";
import { SupplierService } from "./supplier.service";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { GuardDecorator } from "@decorators/guardType";
import { ResponseGetAllSupplier } from "./dtos/responseGetAllSupplier.dto";

@injectable()
@UseMiddleware(AuthMiddleware)
@Resolver()
export default class SupplierResolver {
  constructor(@inject(SupplierService) private readonly supplierService: SupplierService) { }

  @Mutation(() => Supplier)
  async createSupplier(@Arg("data", () => CreateSupplierInput) data: CreateSupplierInput) {
    await validateOrReject(data);

    return await this.supplierService.create(data)
  }

  @GuardDecorator(['CUSTOMER'])
  @Query(() => [ResponseGetAllSupplier])
  async suppliers(@Arg("search", () => Number, { nullable: true }) search?: number) {
    return await this.supplierService.getAll(search)
  }
}
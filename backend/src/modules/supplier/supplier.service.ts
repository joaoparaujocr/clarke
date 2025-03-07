import { inject, injectable } from "tsyringe";
import { SupplierRepository } from "./supplier.repository";
import { CreateSupplierInput } from "./dtos/createSupplierInput.dto";

@injectable()
export class SupplierService {
  constructor(@inject(SupplierRepository) private readonly supplierRepository: SupplierRepository) {}

  async create(data: CreateSupplierInput) {
    return await this.supplierRepository.create(data)
  }
}
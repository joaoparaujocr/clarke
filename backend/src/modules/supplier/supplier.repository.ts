import { ISupplierRepository } from "./interfaces/supplierRepository.interface";
import { injectable } from "tsyringe";
import { CreateSupplierInput } from "./dtos/createSupplierInput.dto";
import Supplier from "@typeorm/entities/supplier";

@injectable()
export class SupplierRepository implements ISupplierRepository {
  async create(data: CreateSupplierInput) {
    const supplier = Supplier.create({ ...data });

    const supplierSave = await supplier.save();

    return supplierSave;
  }
}
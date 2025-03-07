import Supplier from "@typeorm/entities/supplier";
import { CreateSupplierInput } from "../dtos/createSupplierInput.dto";

export interface ISupplierRepository {
  create(data: CreateSupplierInput): Promise<Supplier>
}
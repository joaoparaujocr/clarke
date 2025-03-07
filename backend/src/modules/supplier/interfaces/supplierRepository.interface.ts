import Supplier from "@typeorm/entities/supplier";
import { CreateSupplierInput } from "../dtos/createSupplierInput.dto";
import { ResponseGetAllSupplier } from "../dtos/responseGetAllSupplier.dto";

export interface ISupplierRepository {
  create(data: CreateSupplierInput): Promise<Supplier>
  getAll(search?: number): Promise<ResponseGetAllSupplier[]>
}
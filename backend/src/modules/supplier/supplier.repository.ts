import { ISupplierRepository } from "./interfaces/supplierRepository.interface";
import { injectable } from "tsyringe";
import { CreateSupplierInput } from "./dtos/createSupplierInput.dto";
import Supplier from "@typeorm/entities/supplier";
import { appDataSource } from "@typeorm/data-source";
import { ResponseGetAllSupplier } from "./dtos/responseGetAllSupplier.dto";

@injectable()
export class SupplierRepository implements ISupplierRepository {
  async create(data: CreateSupplierInput) {
    const supplier = Supplier.create({ ...data });

    const supplierSave = await supplier.save();

    return supplierSave;
  }

  async getAll(search?: number) {
    const supplierRepository = appDataSource.getRepository(Supplier);

    let query = await supplierRepository
      .createQueryBuilder("supplier")
      .leftJoin("supplier.customerHistory", "history")
      .select([
        "supplier.id AS id",
        "supplier.name AS name",
        "supplier.logo_url AS logoUrl",
        "supplier.state AS state",
        "supplier.cost_per_kwh AS costPerKwh",
        "supplier.minimum_kwh_limit AS minimumKwhLimit",
        "COALESCE(AVG(history.rating), 0) AS evaluationAverage"
      ])
      .addSelect("COALESCE(AVG(history.rating), 0)", "evaluationAverage")
      .groupBy("supplier.id")

    if (search) {
      query = query.where("supplier.minimum_kwh_limit < :search", { search });
    }

    const suppliersRaw = await query.getRawMany()

    const suppliers = suppliersRaw.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
      logoUrl: supplier.logourl,
      state: supplier.state,
      costPerKwh: Number(supplier.costperkwh),
      minimumKwhLimit: Number(supplier.minimumkwhlimit),
      evaluationAverage: Number(supplier.evaluationaverage),
    }));

    return suppliers as unknown as ResponseGetAllSupplier[];
  }
}
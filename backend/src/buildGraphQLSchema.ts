import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { container } from "tsyringe";
import { ErrorInterceptor } from "./middlewares/error.middleware";
import CustomerResolver from '@modules/customer/customer.resolver';
import SupplierResolver from "@modules/supplier/supplier.resolver";

export async function buildGraphQLSchema() {
  return await buildSchema({
    resolvers: [CustomerResolver, SupplierResolver],
    container: { get: cls => container.resolve(cls) },
    globalMiddlewares: [ErrorInterceptor]
  });
}

import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import CustomerResolver from '@modules/customer/customer.resolver';
import { container } from "tsyringe";
import { ErrorInterceptor } from "./middlewares/error.middleware";

export async function buildGraphQLSchema() {
  return await buildSchema({
    resolvers: [CustomerResolver],
    container: { get: cls => container.resolve(cls) },
    globalMiddlewares: [ErrorInterceptor]
  });
}

import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import CustomerResolver from '@modules/customer/customer.resolver';

export async function buildGraphQLSchema() {
  return await buildSchema({
    resolvers: [CustomerResolver],
  });
}

import { Resolver, Query } from 'type-graphql';
import Customer from '@typeorm/entities/customer';

@Resolver()
export default class CustomerResolver {
  @Query(() => [Customer])
  async Customers() {
    return Customer.find();
  }
}
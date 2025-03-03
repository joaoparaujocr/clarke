import { Resolver, Query, Mutation, Arg, Ctx, Authorized, UseMiddleware } from 'type-graphql';
import Customer from '@typeorm/entities/customer';
import { CreateCustomerInput } from './dtos/createCustomerInput.dto';
import { AuthCustomerResponse } from './dtos/authCustomerResponse.dto';
import { validateOrReject } from "class-validator";
import { CustomerService } from './customer.service';
import { inject, injectable } from 'tsyringe';
import { AuthCustomerInput } from './dtos/authCustomerInput.dto';
import { ContextType } from '@context/context.dto';
import { Message } from './dtos/message.dto';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { GuardDecorator } from '@decorators/guardType';

@injectable()
@UseMiddleware(AuthMiddleware)
@Resolver()
export default class CustomerResolver {
  constructor(@inject(CustomerService) private readonly customerService: CustomerService) { }

  @Query(() => [Customer])
  async Customers(@Ctx() ctx: ContextType) {
    console.log(ctx.req.user)
    return this.customerService.getAll();
  }

  @Mutation(() => Customer)
  async createCustomer(@Arg("data", () => CreateCustomerInput) data: CreateCustomerInput) {
    await validateOrReject(data);

    return this.customerService.create(data)
  }

  @Mutation(() => AuthCustomerResponse)
  async authCustomer(@Arg("data", () => AuthCustomerInput) data: AuthCustomerInput, @Ctx() ctx: ContextType) {
    await validateOrReject(data);

    return await this.customerService.auth(data, ctx.reply)
  }

  @Mutation(() => Message)
  async logout(@Ctx() ctx: ContextType) {
    return this.customerService.logout(ctx.reply);
  }

  @GuardDecorator(['CUSTOMER'])
  @Query(() => Customer)
  async me(@Ctx() ctx: ContextType) {
    return this.customerService.me(ctx.req.user.id);
  }
}
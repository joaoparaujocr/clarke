import Customer from '@typeorm/entities/customer';
import { inject, injectable } from 'tsyringe'
import { CustomerRepository } from './customer.repository';
import { CreateCustomerInput } from './dtos/createCustomerInput.dto';
import { compare, hash } from 'bcryptjs';
import { AppError } from '../../error/appError';
import { AuthCustomerInput } from './dtos/authCustomerInput.dto';
import { FastifyReply } from 'fastify';
import { Message } from './dtos/message.dto';

@injectable()
export class CustomerService {
  constructor(@inject(CustomerRepository) private readonly customerRepository: CustomerRepository) { }

  async getAll(): Promise<Customer[]> {
    return await this.customerRepository.findAll()
  }

  async create(data: CreateCustomerInput) {
    const alreadyExistsCustomer = await this.customerRepository.findByEmail(data.email)

    if (alreadyExistsCustomer) {
      throw new AppError(409, 'Email already exists')
    }

    const passwordHash = await hash(data.password, 12)

    return await this.customerRepository.create({ ...data, password: passwordHash })
  }

  async auth(data: AuthCustomerInput, reply: FastifyReply) {
    const customer = await this.customerRepository.findByEmail(data.email)

    if (!customer) {
      throw new AppError(401, 'Invalid credentials')
    }

    const doesPasswordMatch = await compare(data.password, customer.password)

    if (!doesPasswordMatch) {
      throw new AppError(401, 'Invalid credentials')
    }

    const { email, id } = customer

    const payload = { email, id, type: "CUSTOMER" }

    const token = await reply.jwtSign(payload, {
      sign: {
        sub: id,
      }
    })

    const refreshToken = await reply.jwtSign(payload, {
      sign: {
        sub: id,
        expiresIn: '7d'
      }
    })

    console.log("Node env", process.env.NODE_ENV)

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : 'lax',
      secure: false,
      path: '/',
      domain: process.env.NODE_ENV !== 'dev' ? 'clarkefrontend.vercel.app' : 'localhost',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return {
      token,
      customer
    }
  }

  async me(id: string) {
    const customer = await this.customerRepository.findById(id)

    if (customer) {
      return { ...customer, type: 'CUSTOMER' }
    }

    return customer
  }

  logout(reply: FastifyReply): Message {
    reply.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV !== 'dev' ? 'none' : 'lax',
      secure: false,
      path: '/',
      domain: process.env.NODE_ENV !== 'dev' ? 'clarkefrontend.vercel.app' : 'localhost',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { message: 'Logout successful' }
  }
}
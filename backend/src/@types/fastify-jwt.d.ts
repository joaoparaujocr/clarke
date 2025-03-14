import "@fastify/jwt"

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string,
      email: string,
      id: string
      type: "CUSTOMER"
    }
  }
}
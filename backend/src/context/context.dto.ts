import { FastifyReply, FastifyRequest } from "fastify";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ContextType {
  @Field()
  req: FastifyRequest

  @Field()
  reply: FastifyReply
}
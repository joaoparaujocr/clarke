import { FastifyReply, FastifyRequest } from "fastify";
import { Field, ObjectType } from "type-graphql";
import { GraphQLScalarType } from "graphql";

const FastifyRequestScalar = new GraphQLScalarType({
  name: "FastifyRequest",
  description: "Representação do FastifyRequest",
  parseValue(value: any) {
    return value;
  },
  serialize(value: any) {
    return value;
  },
  parseLiteral(ast: any) {
    return ast.value;
  }
});

const FastifyReplyScalar = new GraphQLScalarType({
  name: "FastifyReply",
  description: "Representação do FastifyReply",
  parseValue(value: any) {
    return value;
  },
  serialize(value: any) {
    return value;
  },
  parseLiteral(ast: any) {
    return ast.value;
  }
});

@ObjectType()
export class ContextType {
  @Field(() => FastifyRequestScalar)
  req: FastifyRequest;

  @Field(() => FastifyReplyScalar)
  reply: FastifyReply;
}

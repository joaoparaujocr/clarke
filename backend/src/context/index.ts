import { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ContextType } from "./context.dto";

export const contextApolloServer: ApolloFastifyContextFunction<ContextType> = async (req: FastifyRequest, reply: FastifyReply) => ({
  req,
  reply
}); 
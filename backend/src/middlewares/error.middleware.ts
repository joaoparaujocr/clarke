import { ContextType } from "@context/context.dto";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { AppError } from "../error/appError";
import { GraphQLError } from "graphql";

export class ErrorInterceptor implements MiddlewareInterface<ContextType> {
  async use(_: ResolverData<ContextType>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      console.log("ERROR", err)
      if (err instanceof AppError) {
        throw new GraphQLError(err.message, {
          extensions: {
            code: err.statusCode,
          }
        })
      }

      throw new GraphQLError("A server error occurred.", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }
  }
}
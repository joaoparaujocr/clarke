import { ContextType } from "@context/context.dto";
import { MiddlewareFn } from "type-graphql";
import { AppError } from "../error/appError";

export function GuardMiddleware(roles: string[]): MiddlewareFn<ContextType> {
  return async ({ context }, next) => {
    const { req } = context;

    if (!req.user || !roles.includes(req.user.type)) {
      throw Error("Unauthorized");
    }

    return next();
  };
}
import { ContextType } from "@context/context.dto";
import { MiddlewareFn } from "type-graphql";
import { AppError } from "../error/appError";

export function GuardMiddleware(roles: string[]): MiddlewareFn<ContextType> {
  return async ({ context }, next) => {
    const { req } = context;

    if (!req.user || !roles.includes(req.user.type)) {
      throw new AppError(403, "You do not have permission to access this resource.");
    }

    return next();
  };
}
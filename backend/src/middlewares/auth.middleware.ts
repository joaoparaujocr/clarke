import { ContextType } from "@context/context.dto";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { AppError } from "../error/appError";

export class AuthMiddleware implements MiddlewareInterface<ContextType> {

  async use({ context }: ResolverData<ContextType>, next: NextFn) {
    try {
      const { req } = context;

      const token = req.cookies?.refreshToken || req.headers['authorization']?.split(' ')[1];

      if (token) {
        await req.jwtVerify({ onlyCookie: false });
      }

      return next();
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError(500, `AuthMiddleware: ${error.message}`);
      }

    }
  }
}
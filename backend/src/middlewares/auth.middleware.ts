import { ContextType } from "@context/context.dto";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";

export class AuthMiddleware implements MiddlewareInterface<ContextType> {

  async use({ context }: ResolverData<ContextType>, next: NextFn) {
    try {
      const { req } = context;

      const token = req.cookies?.refreshToken || req.headers['authorization']?.split(' ')[1];

      if (token) {
        await req.jwtVerify();
      }

      return next();
    } catch (error) {
      console.error(403, "Authentication error:", error);
      throw new Error("Unauthorized");
    }
  }
}
import { ContextType } from "@context/context.dto";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";

export class ErrorInterceptor implements MiddlewareInterface<ContextType> {
  async use(_: ResolverData<ContextType>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      console.log(err)
    }
  }
}
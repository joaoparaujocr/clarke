import { UseMiddleware } from "type-graphql";
import { GuardMiddleware } from "@middlewares/guard.middleware";

export function GuardDecorator(role: string[]) {
  return UseMiddleware(GuardMiddleware(role));
}